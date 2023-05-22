import Head from "next/head";
import styles from "@/styles/landing.module.css";
import "@/styles/globals.css";
import { Alert, LinearProgress, Link } from "@mui/material";
import { useEffect, useState } from "react";

export default function ErrorPage() {

    const [troubleshoot, setTroubleshoot] = useState("An unknown error has occurred. Please contact the administrator.");

    const errors = {
        "database": "The api is unable to connect to the database. Please contact the administrator.",
        "api": "Unable to connect to the API. the API might be down or misconfigured. Please contact the administrator.",
        "not-setup": "The portal have not been set up yet. Please contact the administrator. if you are the administrator, please go to /setup and follow the instructions. to set up the portal.",
        "not-logged-in": "You are not logged in. Please log in to continue.",
        "not-admin": "You are not an administrator. Please log in as an administrator to continue.",
        "not-teacher": "You are not a teacher. Please log in as a teacher to continue.",
        "not-student": "You are not a student. Please log in as a student to continue.",
        "not-parent": "You are not a parent. Please log in as a parent to continue.",
    }

    useEffect(() => {
        // check the query string
        const query = window.location.search;
        if(query === "") return;
        const params = new URLSearchParams(query);
        const error = params.get("cause");
        if(error === null) return;
        for (const [key, value] of Object.entries(errors)) {
            if(key === error) {
                setTroubleshoot(value);
                return;
            }
        }
    })
  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

        <div className={styles.section1}>
            <div className={styles.strcontainer}>
                <h1>SyncedTeach</h1>
                <Alert severity="error">An error has occurred.</Alert>
                <p>{troubleshoot}</p>
                <Link href="/">Go back home</Link>
                </div>
            </div>

    </>
  );
}
