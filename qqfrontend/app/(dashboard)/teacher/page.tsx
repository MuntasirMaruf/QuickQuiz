// app/page.tsx (Home Page)
// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to the Teacher Portal</h1>
//       <p>This is the home page of our educational platform.</p>
      
//       <div style={{ marginTop: '20px' }}>
//         <a href="/user/login" style={{ 
//           padding: '10px 15px', 
//           marginRight: '10px', 
//           backgroundColor: '#0070f3', 
//           color: 'white', 
//           textDecoration: 'none',
//           borderRadius: '5px'
//         }}>
//           Teacher Login
//         </a>
//         <a href="/teacher" style={{ 
//           padding: '10px 15px', 
//           backgroundColor: '#0070f3', 
//           color: 'white', 
//           textDecoration: 'none',
//           borderRadius: '5px'
//         }}>
//           Go to Teacher Dashboard
//         </a>
//       </div>
//     </div>
//   );
// }
export default function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Students</h2>
          <p>Manage student information</p>
          <a href="/teacher/students">View Students</a>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Assignments</h2>
          <p>Create and grade assignments</p>
          <a href="/teacher/assignments">View Assignments</a>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Schedule</h2>
          <p>View your class schedule</p>
          <a href="/teacher/schedule">View Schedule</a>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h2>Messages</h2>
          <p>Communicate with students and parents</p>
          <a href="/teacher/messages">View Messages</a>
        </div>
      </div>
    </div>
  );
}