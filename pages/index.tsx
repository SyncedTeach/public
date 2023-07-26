import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Icon } from "@mui/material";

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

  //   What is this?
  // Syncedteach was developed to solve problems during both online and onsite classes. And also can act as a medium for Teachers, Students, and Parents for various school items such as assigning homework, assignment, or even an announcement to improve the productivity of both Teachers and Students and also enables Parents to track their children when they're in school. (and also for software project contest which we won a gold prize and 3rd runner-up award yes yes)

  // Key Features
  // Self-hosting: Syncedteach offers the flexibility for schools to host the platform on their own domains, databases, servers, and other resources.
  // Open-source: the source code can be freely modified to suit each school/person's needs.
  // API-Keys: A feature which allows users to program themselves and use API Key to automate commands as well.
  // Basic Attached Features
  // Posts: A teacher have an ability to post and anouncements

  // wait 3000ms before redirecting to dashboard
  React.useEffect(() => {
    // setTimeout(() => {
    //   router.push("/dashboard");
    // }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <article className={styles.scroller}>
        <section className={styles.sectionblack}>
          <div
            className={styles.strcontainer}
            style={{
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              margin: "10px",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <h1>SyncedTeach</h1>
            <p>
              SyncedTeach is a platform for schools to manage their students and
              teachers.
            </p>


            {/* scroll to the try me section */}
            {/* Object is possibly 'null'.ts(2531) */}
            <Button variant="contained" color="primary" onClick={() => {document.getElementById("tryme")?.scrollIntoView({behavior: "smooth" })}}>
              Try me!
            </Button> 

            {/* bottom scrool down */}
            <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
              <p style={{ color: "white" }}>Scroll down for more</p>
              <Icon style={{ color: "white" }}>arrow_downward</Icon>
            </div>

            {/* <div
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

              <h2 style={{ color: "black", fontWeight: "bold" }}>
                School Portal Preview
              </h2>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard/preview?select=teacher"
                  style={{ marginBottom: "10px" }}
                >
                  Teacher
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard/preview?select=student"
                  style={{ marginBottom: "10px" }}
                >
                  Student
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard/preview?select=parent"
                  style={{ marginBottom: "10px" }}
                >
                  Parent
                </Button>
              </div>
            </div> */}
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
            {/* <div>
              <footer>
                <u style={{ cursor: "pointer" }}>
                  This website does not actually exist, This is a preview of
                  what the website will look like.
                </u>
                <p style={{ fontSize: "15px" }}>
                  This website doesnt associate with BCC in any way.
                </p>
              </footer>
            </div> */}
          </div>
        </section>

        <section className={styles.sectionblack}>
          <div
            className={styles.strcontainer}
            style={{
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              margin: "10px",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Icon style={{ fontSize: "30px" }}>school</Icon>
            <h2>What is this?</h2>
            <p>
              Syncedteach was developed to solve problems during both online and
              onsite classes. And also can act as a medium for Teachers,
              Students, and Parents for various school items such as assigning
              homework, assignment, or even an announcement to improve the
              productivity of both Teachers and Students and also enables
              Parents to track their children when they&apos;re in school. (and also
              for software project contest which we won a gold prize and 3rd
              runner-up award yes yes)
            </p>

            <br />

            <Icon style={{ fontSize: "30px" }}>settings</Icon>
            <h2>How does it work?</h2>
            <p>
              Syncedteach is a platform for schools to manage their students and
              teachers. It is a web-based application that can be accessed
              through a web browser. Syncedteach is a platform for schools to
              manage their students and teachers. It is a web-based application
              that can be accessed through a web browser. and can be turned into
              a mobile application using a webview.
            </p>
          </div>
        </section>

        <section className={styles.sectionblack}>
          <div
            className={styles.strcontainer}
            style={{
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              margin: "10px",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <h1>Key Features</h1>
            <div className={styles.features}>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "50px" }}>dns</Icon>
                <h2>Self-hosting</h2>
                <p>
                  Syncedteach offers the flexibility for schools to host the
                  platform on their own domains, databases, servers, and other
                  resources.
                </p>
              </div>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "50px" }}>code</Icon>
                <h2>Open-source</h2>
                <p>
                  the source code can be freely modified to suit each
                  school/person&apos;s needs.
                </p>
              </div>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "50px" }}>vpn_key</Icon>
                <h2>API-Keys</h2>
                <p>
                  A feature which allows users to program themselves and use API
                  Key to automate commands as well.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectionblack}>
          <div
            className={styles.strcontainer}
            style={{
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              margin: "10px",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <h1>Features</h1>
            <div className={styles.features}>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "20px" }}>person</Icon>
                <h2>Teacher</h2>
                <p>
                  Teachers can assign homework, assignments, and announcements
                  to students. Teachers can also track students&apos; progress and
                  attendance.
                </p>
              </div>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "20px" }}>school</Icon>
                <h2>Student</h2>
                <p>
                  Students can view their homework, assignments, and
                  announcements. Students can also view their progress and
                  attendance.
                </p>
              </div>

              <div className={styles.feature}>
                <Icon style={{ fontSize: "20px" }}>family_restroom</Icon>
                <h2>Parent</h2>
                <p>
                  Parents can view their children&apos;s homework, assignments, and
                  announcements. Parents can also view their children&apos;s progress
                  and attendance.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectionblack} id="tryme">
          <div
            className={styles.strcontainer}
            style={{
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              margin: "10px",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <h1>Check em out!</h1>
            <div className={styles.features}>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "40px" }}>person</Icon>
                <h2>Teacher</h2>
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard/preview?select=teacher"
                >
                  Preview
                </Button>
              </div>
              <div className={styles.feature}>
                <Icon style={{ fontSize: "40px" }}>school</Icon>
                <h2>Student</h2>
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard/preview?select=student"
                >
                  Preview
                </Button>
              </div>

              <div className={styles.feature}>
                <Icon style={{ fontSize: "40px" }}>family_restroom</Icon>
                <h2>Parent</h2>
                <Button
                  variant="contained"
                  color="primary"
                  href="/dashboard/preview?select=parent"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <footer>
            <div style={{ padding: "4px" }} className="text--size-medium">
              Made by{" "}
              <a href="https://mistertfy64.com">
                <Image
                  src="/static/images/mistertfy64.png"
                  alt="mistertfy64"
                  width="121"
                  height="20"
                ></Image>
              </a>{" "}
              and{" "}
              <a className="text--link" href="https://phatlor.me">
                EpicCatto
              </a>
            </div>
            <div className="text--size-small">
              <a
                className="text--link"
                href="https://github.com/SyncedTeach/public"
              >
                Frontend Repository
              </a>{" "}
              •{" "}
              <a
                className="text--link"
                href="https://github.com/SyncedTeach/api"
              >
                API Repository
              </a>{" "}
              •{" "}
              <a
                className="text--link"
                href="https://github.com/SyncedTeach/core"
              >
                Installation Instructions
              </a>
              <br></br>
              Made as a project for a software competition, but free for anyone
              to use commercially.
            </div>
          </footer>
        </section>
      </article>
    </>
  );
}
