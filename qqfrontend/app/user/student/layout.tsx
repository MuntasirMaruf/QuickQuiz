// app/student/layout.js
export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Student Header */}
        <header>
          <div>
            <h1>Student Portal</h1>
            <nav>
              <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/courses">My Courses</a></li>
                <li><a href="/grades">Grades</a></li>
                <li><a href="/schedule">Schedule</a></li>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Student Footer */}
        <footer>
          <div>
            <p>&copy; 2024 Student Portal. All rights reserved.</p>
            <div>
              <a href="/help">Help</a>
              <span> | </span>
              <a href="/contact">Contact Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}