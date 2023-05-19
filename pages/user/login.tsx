import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const LoginPage = () => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [user, setUser] = useState(null)

    useEffect(() => {
        // check if user is logged in
        // if logged in redirect to home page
        // if not logged in, do nothing

        localStorage.setItem("user", JSON.stringify({name: "John Doe"}))
    }, [])


    return (
        <div>
            <h1>Login Page</h1>
        </div>
    )
}

export default LoginPage