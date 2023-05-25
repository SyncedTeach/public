import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  LinearProgress
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [value, setValue] = React.useState(1);
  const router = useRouter();

//   get id query
    const { id } = router.query;

  const students = [
    {
        name: "Student 1",
        id: "38xx",
        number: "1",
        overdue: "1",
    },
    {
        name: "Student 2",
        id: "38xx",
        number: "2",
        overdue: "0",
    },
    {
        name: "Student 3",
        id: "38xx",
        number: "3",
        overdue: "0",
    },
  ];

  const homePage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        <h2>Class - Classname</h2>
        <br></br>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
              }}
            >
              <h3 style={{ color: "white" }}>Assignments</h3>
              <br />

              <p style={{ color: "#42ba96" }}>completed</p>
              <p style={{ fontSize: "20px" }}>completed-assign-amount</p>
              <br />
              <p style={{ color: "#FFD700" }}>assigned</p>
              <p style={{ fontSize: "20px" }}>all-assign-amount</p>
              <br />
              <p style={{ color: "#ff0000" }}>overdue</p>
              <p style={{ fontSize: "20px" }}>overdue-assign-amount</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
              }}
            >
              <h3 style={{ color: "white" }}>Exams</h3>
              <br />
              <p style={{ color: "#42ba96" }}>next</p>
              <p style={{ fontSize: "20px" }}>next-exam-date</p>
              <br />
              <p style={{ color: "#FFD700" }}>subject</p>
              <p style={{ fontSize: "20px" }}>next-subect</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const studentsPage = (
    <div className={styles.section1} >
      <div className={styles.strcontainer}>
        {/* listing classes */}
        <h2>Students</h2>
        <br></br>
        <div>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            {students.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Paper
                  sx={{
                    p: 2,
                    margin: "auto",
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: "#1A2027",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ color: "white" }}>{item.id} - {item.name}</h3>
                    <p>Number - {item.number}</p>
                    <p style={{ color: "#ff0000" }}>Overdue - {item.overdue}</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );

  const currentPage = () => {
    switch (value) {
      case 1:
        return homePage;
    case 2:
        return studentsPage;
    }
  };

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
      {currentPage()}
      <BottomNavigation
        showLabels
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          // backgroundColor: "#1A2027",
          color: "white",
        }}
        value={value}
        onChange={(event, newValue) => {
        //   console.log(newValue);
          setValue(newValue);
          if (newValue === 0) {
            router.push("/dashboard/teacher?page=1");
          }
        }}
      >
        <BottomNavigationAction label="Back" icon={<Icon>arrow_back</Icon>} />
        <BottomNavigationAction label="Home" icon={<Icon>home</Icon>} />
        <BottomNavigationAction label="Students" icon={<Icon>people</Icon>} />
        <BottomNavigationAction
          label="Assignment"
          icon={<Icon>assignment</Icon>}
        />
        <BottomNavigationAction label="Exams" icon={<Icon>quiz</Icon>} />
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </>
  );
}
