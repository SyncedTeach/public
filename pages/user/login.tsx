import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/login.module.css";
import "@/styles/globals.css";
import { Alert, Button, Input, TextField } from "@mui/material";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const authenticate = async (credentials: {
    [key: string]: string | null;
  }) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const response = authenticate({ username, password });
    // .then((data) => {
    //   if (data.success === true) {
    //     setError("");
    //     setStatus("Success! Redirecting...");
    //     setTimeout(() => {
    //       router.push("/dashboard");
    //     }, 1000);
    //   } else {
    //     setError(data.message);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setError("An error occurred");
    // });

    response.then((data) => {
      if (data.success === true) {
        setError("");
        setStatus("Success! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError(data.message);
      }
    }
    ).catch((error) => {
      console.log(error);
      setError("An error occurred");
    }
    )
      
  };
  useEffect(() => {
    // check if user is logged in
    // if logged in redirect to home page
    // if not logged in, do nothing

    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
  }, []);

  return (
    //   <div>
    //     <div style={{"marginTop":"16px"}} className={`${styles["login-page"]} ${"border--rounded"} ${"margin--standard"}`}>
    //     <Image
    //             src="/syncedteach.png"
    //             alt="SyncedTeach logo"
    //             width={100}
    //             height={24}
    //             priority
    //           />
    //     <br>
    //     </br>
    //     Official
    //     <br>
    //     </br>
    //     <form className={`${"width--very-wide"} ${"margin--auto"}`} onSubmit={handleLogin} method="POST">
    //       <label htmlFor="username">Username</label>
    //       <br></br>
    //       <input type="text" id="username" name="username"  className={`${"width--full"}`} onChange={event => setUsername(event.target.value)}></input>
    //       <br></br>
    //       <label htmlFor="password">Password</label>
    //       <br></br>
    //       <input type="password" id="password" name="password" className={`${"width--full"}`} onChange={event => setPassword(event.target.value)}></input>
    //       <br></br>
    //       <br></br>
    //       <button className={`${"button--positive"} ${"width--very-wide"} ${"margin--standard"}`}><span className={`${"text--size-large"}`}>Login</span></button>
    //       <br></br>
    //     </form>
    //   </div>
    // </div>
    <div className={styles["login-page"]}>
      <form onSubmit={handleLogin} method="POST">
        <div className={styles.logincontainer}>
          <Image
            src="/favicon.ico"
            alt="SyncedTeach logo"
            width={64}
            height={64}
            priority
            style={{ margin: "10px", borderRadius: "10px" }}
          />
          <label style={{ fontSize: "20px" }}>Login</label>
          {error !== "" ? (
            <Alert severity="error" style={{ margin: "10px" }}>
              {error}
            </Alert>
          ) : (
            <></>
          )}

          {status !== "" ? (
            <Alert severity="success" style={{ margin: "10px" }}>
              {status}
            </Alert>
          ) : (
            <></>
          )}
          <Input
            placeholder="Username"
            inputProps={{ "aria-label": "description" }}
            onChange={(event) => setUsername(event.target.value)}
            style={{
              color: "white",
              margin: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.55)",
              padding: "10px",
              borderRadius: "15px",
            }}
          />

          <Input
            placeholder="Password"
            inputProps={{ "aria-label": "description" }}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            style={{
              color: "white",
              margin: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.55)",
              padding: "10px",
              borderRadius: "15px",
            }}
          />

          <Button variant="contained" type="submit" style={{ margin: "10px" }}>
            Login
          </Button>

          <br></br>

          <Link href="/user/register" style={{ color: "#c5c5c5 " }}>
            Don&apos;t have an account? Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
