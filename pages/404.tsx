import Head from "next/head";
import * as React from "react";
import styles from "@/styles/landing.module.css";
import "@/styles/globals.css";
import { LinearProgress, Link } from "@mui/material";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

        <div className={styles.section1}>
            <div className={styles.strcontainer}>
                <h1>SyncedTeach</h1>
                <p>404 - The page you&apos;re looking for does&apos;t exist. <Link href="/">Go back home</Link></p>
                </div>
            </div>

    </>
  );
}
