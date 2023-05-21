import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";

export default function Home() {
  const userOptions = [
    {
      name: "Teacher",
      link: "/user/login?type=teacher",
      url: "/static/images/teacher.png",
      width: "20%",
    },
    {
      name: "Student",
      link: "/user/login/?type=student",
      url: "/static/images/student.png",
      width: "20%",
    },
    {
      name: "Parent",
      link: "/user/login/?type=parent",
      url: "/static/images/parent.png",
      width: "20%",
    },
  ];

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
