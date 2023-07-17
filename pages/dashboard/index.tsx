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
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(settings.config.api_route + "/v1/user/self", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success !== true) {
          return router.push("/user/login");
        }

        if (!data.data.membership) {
          setMessage(
            "Thank you for registering. It seems like you're not in any of our user types (Teacher, Student, Parent). If you think this is an error, you can click the button below and follow the instructions."
          );
        } else if (data.data.membership.isTeacher) {
          setMessage("You are a teacher, redirecting you to the teacher dashboard");
          router.push("/dashboard/teacher");
        } else if (data.data.membership.isStudent) {
          setMessage("You are a student, redirecting you to the student dashboard");
          router.push("/dashboard/student");
        } else if (data.data.membership.isParent) {
          setMessage("You are a parent, redirecting you to the parent dashboard");
          router.push("/dashboard/parent");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle any errors here
      }
    };

    fetchData();
  }, []);

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
        <Button variant="contained" onClick={() => router.push("/user/setup")} disabled={isMessageLoading || isMessageUserType}>
          Setup
        </Button>
      </div>
    </div>
      )}

    </>
  );
}
