import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
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

  // wait 3000ms before redirecting to dashboard
  React.useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className={styles.section1}>
        <div
          className={styles.strcontainer}
          style={{
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            margin: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <Image
              src="/favicon.ico"
              alt="SyncedTeach logo"
              width={64}
              height={64}
              priority
              style={{ margin: "10px", borderRadius: "10px" }}
            />
            <img src="http://bcc.ac.th/2019/img/logo/logo_bcc.png" alt="icon" />
          </div>
          <br />
          {/* <h1>BCC - ST Preview</h1>
          <p>Getting things ready hang tight!</p> */}

          {/* hyperlink */}
          {/* <u
            onClick={() => router.push("/dashboard")}
            style={{ cursor: "pointer" }}
          >
            Not getting redirected? Click here
          </u> */}
          <div>
            <footer>
              <u style={{ cursor: "pointer" }}>
                This website does not actually exist, This is a preview of what
                the website will look like.
              </u>
              <p style={{ fontSize: "15px" }}>
                This website doesnt associate with BCC in any way.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
