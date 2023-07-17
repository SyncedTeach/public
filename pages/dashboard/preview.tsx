import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import settings from "@/utils/settings";
import {
  LinearProgress,
  Backdrop
} from "@mui/material";

export default function Dashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("Setting up please wait...");

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

  useEffect(() => {
    const {select} = router.query;
    const fetchData = async () => {
      try {
        if(select === "teacher"){
            authenticate({ username: "PreviewTeacher", password: "12345678" }).then((data) => {
                if (data.success === true) {
                    setMessage("Setting up complete! Redirecting...");
                    localStorage.setItem("user_id", data.uid);
                    setTimeout(() => {
                        router.push("/dashboard");
                    }
                    , 1000);
                } else {
                    setMessage(data.message);
                }
            }).catch((error) => {
                console.log(error);
                setMessage("An error occurred");
            });
        }else if(select === "student"){
            authenticate({ username: "PreviewStudent", password: "12345678" }).then((data) => {
                if (data.success === true) {
                    setMessage("Setting up complete! Redirecting...");
                    localStorage.setItem("user_id", data.uid);
                    setTimeout(() => {
                        router.push("/dashboard");
                    }
                    , 1000);
                }
            }).catch((error) => {
                console.log(error);
                setMessage("An error occurred");
            });

        }else if(select === "parent"){
            authenticate({ username: "PreviewParent", password: "12345678" }).then((data) => {
                if (data.success === true) {
                    setMessage("Setting up complete! Redirecting...");
                    localStorage.setItem("user_id", data.uid);
                    setTimeout(() => {
                        router.push("/dashboard");
                    }
                    , 1000);
                }
            }).catch((error) => {
                console.log(error);
                setMessage("An error occurred");
            });
        }else{
            setMessage("None selected");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle any errors here
      }
    };

    fetchData();
  }, [router.isReady]);

  const loading = (
    <>
      <LinearProgress />
      <div className={styles.section}>
        <div className={styles.strcontainer}>
          <h1>SyncedTeach</h1>
          <p>Loading...</p>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      ></Backdrop>
    </>
  );

  const isMessageLoading = message.includes("Loading");
  const isMessageUserType = message.includes("You are a");

  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {isMessageLoading ? loading : (
      <div className={styles.section}>
      <div className={styles.strcontainer}>
        <h1>SyncedTeach</h1>
        <p>{message}</p>
        <br />
      </div>
    </div>
      )}

    </>
  );
}
