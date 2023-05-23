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
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const classes = [
    {
      name: "Class P.2/1",
      id: "1",
    },
    {
      name: "Class M.48",
      id: "2",
    },
    {
      name: "Class M.58",
      id: "3",
    },
  ];

  const homePage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        <h2>Welcome namehere, this is your teacher panel</h2>
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
              <h3 style={{ color: "white" }}>class-subject</h3>
              <br />

              <p style={{ color: "#42ba96", fontSize: "20px" }}>You have</p>
              <p>class-students-size Students</p>
              <br />
              <p style={{ color: "#FFD700", fontSize: "20px" }}>You&apos;re teaching</p>
              <p>class-classroom-size Classrooms</p>
              
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const classesPage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        {/* listing classes */}
        <h2>Classes</h2>
        <br></br>
        <div>
        <Grid container spacing={2} direction='column' justifyContent="center" >
          {classes.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Paper
              onClick={() => router.push(`/dashboard/teacher/class?id=${item.id}`)}
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#1A2027",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ color: "white" }}>{item.name}</h3>
                <p>{item.id}</p>
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
      case 0:
        return homePage;
      case 1:
        return classesPage;
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
          // console.log(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Icon>home</Icon>} />
        <BottomNavigationAction label="Classes" icon={<Icon>class</Icon>} />
        <BottomNavigationAction label="Settings" icon={<Icon>settings</Icon>} />
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </>
  );
}
