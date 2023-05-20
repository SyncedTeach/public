import { FormEvent,useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from 'next/image'

const LoginPage = () => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [user, setUser] = useState(null)
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
    useEffect(() => {
        // check if user is logged in
        // if logged in redirect to home page
        // if not logged in, do nothing

        localStorage.setItem("user", JSON.stringify({name: "John Doe"}))
    }, [])


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

export default LoginPage