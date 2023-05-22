import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

        <div className={styles.section1}>
            <div className={styles.strcontainer}>
                <h1>SyncedTeach</h1>
                <>Thank you for registering this portal. this is still a work in progress, so please be patient.</>
                </div>
            </div>

    </>
  );
}
