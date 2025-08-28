import Link from "next/link";

export default function StudentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
          <nav>Student Sidebar</nav>
          <main>{children}</main>  {/* wraps page.tsx */}
        </div>
      );
}