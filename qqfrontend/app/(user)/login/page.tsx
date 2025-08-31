"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Register from "../../components/Register";

export default function LoginPage() {
  const [username, setUsername] = useState<string>('akash');
  const [password, setPassword] = useState<string>('111111');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
 
    console.log('Login attempt:', { username, password });
   
    router.push('/dashboard');
  };

  return (
    <div className="py-4 shadow">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username : </label>
        <input type="text"  value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          placeholder="username"  
        />
        <br />
           <label>Password : </label>
        <input type="password"  value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="password"   
        />
        <br />
       
        <button type="submit">LOG IN</button>
         <p>Don't have an account? <Link href="/components/Register">Register</Link></p>
      </form>
    </div>
  );
}

