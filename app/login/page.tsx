'use client';
import Image from 'next/image'
import '../global.css'
import { FormEvent, useState } from 'react'
export default function LoginPage() {
  
  const [username, setUsername] = useState<string|null>(null);
  const [password, setPassword] = useState<string|null>(null);

  const authenticate = async (credentials: {[key:string]:string|null}) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  } 

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    
    const response = authenticate({username,password})
  }
  
  return (
    <div>
      <Image
              src="/syncedteach.png"
              alt="SyncedTeach logo"
              width={100}
              height={24}
              priority
            />
      <br>
      </br>
      Official
      <br>
      </br>
      <form onSubmit={handleLogin} method="POST">
        <label htmlFor="username" className="">Username</label>
        <br></br>
        <input type="text" id="username" name="username" onChange={event => setUsername(event.target.value)}></input>
        <br></br>
        <label htmlFor="password" className="">Password</label>
        <br></br>
        <input type="password" id="password" name="password" onChange={event => setPassword(event.target.value)}></input>
        <br></br>
        <br></br>
        <button className="button--positive">Login</button>
      </form>
    </div>
  )
}

