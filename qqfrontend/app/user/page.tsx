"use client"; 
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"

export default function UserLogin() {
    const router = useRouter(); 
    return (
        <>
        <button onClick={() => router.back()} className="text-blue-500 underline">
        ⬅ Go Back
        </button> <br/>
        UserName: <input type="text"/><br/>
        Password: <input type="password"/><br/>
        <Link href="/user/student/maruf">Sign In</Link>
        </>
    );
}