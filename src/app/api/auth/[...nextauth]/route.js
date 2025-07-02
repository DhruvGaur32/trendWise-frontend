// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Add authorization parameters for better compatibility
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" }
            },
            async authorize(credentials) {
                await connectDB();

                try {
                    // Sign-up logic
                    if (credentials.action === "signup") {
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
                } catch (error) {
                    // Throw specific error messages for client handling
                    throw new Error(error.message);
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error"
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            // Only handle Google provider
            if (account.provider === "google") {
                await connectDB();

                try {
                    const existingUser = await User.findOne({ email: profile.email });

                    if (!existingUser) {
                        // Create new user with Google profile data
                        await User.create({
                            name: profile.name,
                            email: profile.email,
                            image: profile.picture,
                            // Add provider flag
                            authProvider: "google"
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Google signIn error:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            // Pass user ID to token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Enhance session with user ID
            if (session.user) {
                session.user.id = token.id;

                // Add additional user data from database
                await connectDB();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.role = dbUser.role || "user";
                    session.user.image = dbUser.image;
                }
            }
            return session;
        }
    },
    // Required for production
    secret: process.env.NEXTAUTH_SECRET,
    // Enable debug logs in development
    debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
