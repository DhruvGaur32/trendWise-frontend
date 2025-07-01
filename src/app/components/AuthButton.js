// components/AuthButton.js
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function AuthButton() {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") return <button disabled>Loading...</button>;

    if (session) {
        return (
            <div>
                <span className="mr-2">Hello, {session.user.name}</span>
                <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
            </div>
        );
    }
    return (
        // Redirect to signin page when not logged in

        <button onClick={() => router.push("api/auth/signin")} className="px-4 py-2 bg-blue-600 text-white rounded">
            Login 
        </button>
    );
}
