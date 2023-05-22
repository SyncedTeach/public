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
  const [confirm_password, setConfirmPassword] = useState<string | null>(null);
  const [personal_email, setPersonalEmail] = useState<string | null>(null);

  const [confirm_password_error, setConfirmPasswordError] =
    useState<boolean>(false);
  const [confirm_mail_error, setConfirmMailError] = useState<boolean>(false);

  const authenticate = async (credentials: {
    [key: string]: string | null;
  }) => {
    return fetch(`${settings.config.api_route}/v1/register`, {
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
    if (username === null || username.length < 3 || username.length > 20) {
      setError("Username must be between 3 and 20 characters");
      return;
    }
    if (password === null || password.length < 8 || password.length > 20) {
      setError("Password must be between 8 and 20 characters");
      return;
    }

    if (personal_email === null || !personal_email.includes("@")) {
      setConfirmMailError(true);
      setError("Please enter a valid email");
      return;
    }
    setConfirmMailError(false);
    if (password !== confirm_password) {
      setConfirmPasswordError(true);
      setError("Passwords do not match");
      return;
    }
    setConfirmPasswordError(false);

    const response = authenticate({ username, password, personal_email });
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
        <title>SyncedTeach - Register</title>
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
            <label style={{ fontSize: "20px" }}>Register</label>
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
              Username
            </InputLabel>

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

            <InputLabel
              htmlFor="my-input"
              style={confirm_mail_error ? { color: "red" } : { color: "white" }}
            >
              Personal Email
            </InputLabel>
            <Input
              placeholder="Personal Email"
              error={confirm_mail_error}
              inputProps={{ "aria-label": "description" }}
              onChange={(event) => setPersonalEmail(event.target.value)}
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
            <InputLabel
              htmlFor="my-input"
              style={
                confirm_password_error ? { color: "red" } : { color: "white" }
              }
            >
              Confirm Password
            </InputLabel>

            <Input
              placeholder="Confirm Password"
              inputProps={{ "aria-label": "description" }}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              error={confirm_password_error}
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
              Register
            </Button>

            <br></br>

            <Link href="/user/login" style={{ color: "#c5c5c5 " }}>
              Already have an account? Login here.
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
