// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const router = useRouter();

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Basic client-side validation
//     if (!username || !password) {
//       setError('Please fill in all fields');
//       return;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
 
//     console.log('Login attempt:', { username, password });
   
//     router.push('/dashboard');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setUsername(e.target.value)
//           }
//           placeholder="Username"
//           required
//         />
//         <br />
//         <input
//           type="password"
//           value={password}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setPassword(e.target.value)
//           }
//           placeholder="Password"
//           required
//         />
//         <br />
       
//         <button type="submit">LOG IN</button>
//       </form>
//     </div>
//   );
// }



export default function Login() {
  return (
    <>
    <div className="py-4 shadow">
      <h1>Login Page</h1>
      <br />
      <form className="max-w-7xl ma-auto px-4 sm:px-6 lg:px-8 ">
        <div>
          <label>Username</label>
          <input name="username" />
        </div>
        <br />
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      </div>
    </>
  );
}