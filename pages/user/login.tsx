import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/login.module.css";
import "@/styles/globals.css";
import { Alert, Button, Input, InputLabel, TextField } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import settings from "@/utils/settings";

const LoginPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const authenticate = async (credentials: {
    [key: string]: string | null;
  }) => {
    return fetch(`${settings.config.api_route}/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
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

    response
      .then((data) => {
        if (data.success === true) {
          setError("");
          setStatus("Success! Redirecting...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred");
      });
  };
  useEffect(() => {
    // check if user is logged in
    // if logged in redirect to home page
    // if not logged in, do nothing

    localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
  }, []);

  return (
    <>
      <Head>
        <title>SyncedTeach - Login</title>
      </Head>
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

            <br></br>

            <InputLabel htmlFor="my-input" style={{ color: "white" }}>
              Email or Username
            </InputLabel>

            <Input
              placeholder="Email or Username"
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

            <InputLabel htmlFor="my-input" style={{ color: "white" }}>
              Password
            </InputLabel>

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

            <Button
              variant="contained"
              type="submit"
              style={{ margin: "10px" }}
            >
              Login
            </Button>

            <br></br>

            <Link href="/user/register" style={{ color: "#c5c5c5 " }}>
              Don&apos;t have an account? Register here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
