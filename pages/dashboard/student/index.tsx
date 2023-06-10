import Head from "next/head";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  Backdrop,
  Input,
  Card,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import settings from "@/utils/settings";

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const [data, setData] = useState<any>({
    username: "",
  });

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
  useEffect(() => {
    router.push(`/dashboard/student?page=${value}`);
  }, [value]);

  useEffect(() => {
    if (router.query.page) {
      setValue(parseInt(router.query.page as string));
    }
    fetch(
      settings.config.api_route + "/v1/user/self",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success !== true) {
          console.log("error " + res.data);
          router.push("/dashboard");
          return Promise.resolve(false); // Return a promise that resolves to false
        }
        if (!res.data.membership || !res.data.membership.isStudent) {
          router.push("/error?cause=not-student");
          return false; // Return false
        }
        setData(res.data);
        console.log(res.data);
        return true; // Return true
      });
  }, []);

  const homePage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        <h2>Welcome {data.username}, this is your teacher panel</h2>
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
              <p style={{ color: "#FFD700", fontSize: "20px" }}>
                You&apos;re teaching
              </p>
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
        <Card
          sx={{
            p: 2,
            margin: "20px",
            maxWidth: 500,
            maxHeight: 200,
            flexGrow: 1,
            backgroundColor: "#1A2027",
          }}
        >
          <p>Join class manually</p>
          <Input
            placeholder="Class Code"
            style={{
              color: "white",
              backgroundColor: "#2A2F36",
              marginBottom: "10px",
            }}
          />
          <br />
          <Button variant="contained" style={{ backgroundColor: "#42ba96" }}>
            Join Class
          </Button>
        </Card>

        <div>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            {classes.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Paper
                  onClick={() =>
                    router.push(`/dashboard/teacher/class?id=${item.id}`)
                  }
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

  const loading = (
    <>
      <LinearProgress />
      <div className={styles.section1}>
        <div className={styles.strcontainer}>
          <h1>SyncedTeach</h1>
          <p>Loading...</p>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      ></Backdrop>
    </>
  );

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
      {/* if data is empty show <LinearProgress /> if not current page */}
      {/* {currentPage()} */}
      {data.username ? currentPage() : loading}
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
