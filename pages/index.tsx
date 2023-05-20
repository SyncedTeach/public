import Head from "next/head";
import * as React from "react";
import Button from "@mui/material/Button";
import landing from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";

export default function Home() {
  const userOptions = [
    {
      name: "Teacher",
      link: "/user/login?type=teacher",
      url: "/static/imgs/teacher.png",
      width: "20%",
    },
    {
      name: "Student",
      link: "/user/login/?type=student",
      url: "/static/imgs/student.png",
      width: "20%",
    },
    {
      name: "Parent",
      link: "/user/login/?type=parent",
      url: "/static/imgs/parent.png",
      width: "20%",
    },
  ];

  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className={landing.section1}>
        <div className={landing.strcontainer}>
          <h1>SyncedTeach</h1>
          <p>An all-in-one school portal teachers, students, and parents.</p>
          <br></br>
          <p>Get started</p>
          <div className={landing.btncontainer}></div>
        <LandingUserOptions userOptions={userOptions} />
        </div>
      </div>
    </>
  );
}
