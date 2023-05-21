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
          <p>An all-in-one school portal teachers, students, and parents.</p>
          <br></br>
          <p>Get started</p>
          <div className={styles.btncontainer}></div>
        <LandingUserOptions userOptions={userOptions} />
        <br></br>
        <div style={{"padding":"4px"}}className="text--size-medium">
          Made by <a href="https://mistertfy64.com"><Image src="/static/images/mistertfy64.png" alt="mistertfy64" width="121" height="20" style={{"top":"5px","position":"relative"}}></Image></a> and <a className="text--link" href="https://github.com/EpicCatto">EpicCatto</a>
        </div>
        <div className="text--size-small">
          <a className="text--link" href="https://github.com/SyncedTeach/public">Frontend Repository</a> • <a className="text--link" href="https://github.com/SyncedTeach/api">API Repository</a> • <a className="text--link" href="https://github.com/SyncedTeach/core">Installation Instructions</a>
          <br></br>
          Made as a project for a software competition, but free for anyone to use commercially.
        </div>
        </div>
      </div>
    </>
  );
}
