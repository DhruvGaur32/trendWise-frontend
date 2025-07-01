// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../models/User"; // Your user model
import connectDB from "../../../lib/db"; // Your DB connection

export const authOptions = {
    providers: [
        // Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Email/Password Credentials
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" }
            },
            async authorize(credentials) {
                await connectDB();

                // Sign-up logic
                if (credentials.action === "signup") {
                    try {
                        const existingUser = await User.findOne({ email: credentials.email });
                        if (existingUser) throw new Error("User already exists");

                        const hashedPassword = await bcrypt.hash(credentials.password, 12);
                        const newUser = await User.create({
                            email: credentials.email,
                            name: credentials.name,
                            password: hashedPassword
                        });

                        return {
                            id: newUser._id.toString(),
                            email: newUser.email,
                            name: newUser.name
                        };
                    } catch (error) {
                        throw new Error(error.message);
                    }
                }

                // Sign-in logic
                if (credentials.action === "signin") {
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) throw new Error("User not found");

                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) throw new Error("Invalid password");

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name
                    };
                }

                return null;
            }
        })
          
    ],
    pages: {
        signIn: "/auth/signin",
        newUser: "/" // Redirect after first signup
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    await connectDB();

                    // Check if user exists
                    const existingUser = await User.findOne({ email: profile.email });

                    if (!existingUser) {
                        // Create new user
                        await User.create({
                            name: profile.name,
                            email: profile.email,
                            image: profile.picture,
                            // Add other fields as needed
                        });
                    }
                    return true; // Allow sign-in
                } catch (error) {
                    console.error("Error saving Google user:", error);
                    return false; // Block sign-in on error
                }
            }
            return true; // Allow other providers
        },
        async session({ session, token }) {
            // Fetch user from DB and add to session
            if (session.user?.email) {
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.id = dbUser._id.toString();
                    session.user.role = dbUser.role; // Add custom fields
                }
            }
            return session;
          },
        async jwt({ token, user }) {
            if (user) token.id = user._id;
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
