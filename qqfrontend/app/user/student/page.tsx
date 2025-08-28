import Link from "next/link"

export default function Student() {
    return (
        <>
        This is the Student Login Page <br/>
        <Link href="/user/student/maruf">Maruf</Link> <br/>
        <Link href="/user/student/jacob">Jacob</Link> <br/>
        <Link href="/user/student/green">Green</Link> <br/>
        </>
    )
}