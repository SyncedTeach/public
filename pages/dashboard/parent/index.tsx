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
  Chip
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

  const [studentData, setStudentData] = useState<any>({
    username: "",
    studentID: "",
    classID: "",
    imageB64: "",
  });

  useEffect(() => {
    router.push(`/dashboard/parent?page=${value}`);
  }, [value]);

  useEffect(() => {

    if (router.query.page) {
      setValue(parseInt(router.query.page as string));
    }
    fetch(settings.config.api_route + "/v1/user/self", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res): boolean | Promise<boolean> => {
        if (res.success !== true) {
          console.log("error " + res.data);
          router.push("/dashboard");
          return Promise.resolve(false);
        }
        // Validate user role
        if (!res.data.membership || !res.data.membership.isParent) {
          router.push("/error?cause=not-parent");
          return false;
        }
        setData(res.data);
        console.log(res.data);
        return true;
      });
    
  }, []);

  const homePage = (
    <div className={styles.section}>
      <div className={styles.strcontainer}>
        <h2>Welcome {data.username}, this is your parent panel</h2>
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
              <h3 style={{ color: "white" }}>student-name</h3>
              <br />
              <Image
                src={studentData.imageB64}
                width={200}
                height={200}
                alt="student-img"
              />
              <p style={{ color: "", fontSize: "20px" }}>
                Your student is in
              </p>
              <p>M58</p>
              <p style={{ color: "", fontSize: "20px" }}>
                Attendence status
              </p>
              <Chip label="Present" color="success" />
              <br />
              <p style={{ color: "#42ba96", fontSize: "20px" }}>
                Check-in time: 7:39 AM (6/17/2023)
              </p>


            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const attendencePage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        {/* listing classes */}
        <h2>Attendence</h2>
        <br/>
        <Grid container spacing={2} justifyContent="center">
        <Paper
          sx={{
            p: 2,
            marginLeft: "35px",
            marginRight: "20px",
            maxWidth: 600,
            // maxHeight: 200,
            flexGrow: 1,
            backgroundColor: "#1A2027",
          }}
        >
          <h4>Daily attendence</h4>
          <p>(6/17/2023)</p>

          <Card
            sx={{
              p: 2,
              margin: "20px",
              maxWidth: "auto",
              maxHeight: 3000,
              flexGrow: 1,
              backgroundColor: "#1A24527",
            }}
          >
            <h4>Check-in </h4>
            <p style={{color: "#ff0000", borderRadius: "10px"}}>Absent</p>
            <p>Location:  BCC Sirinat Building</p>
            <p>7:39 AM</p>
          </Card>

          <Paper
            sx={{
              p: 2,
              margin: "20px",
              maxWidth: "auto",
              maxHeight: 3000,
              flexGrow: 1,
              backgroundColor: "#1A24527",
            }}
          >
            <h4>Check-out</h4>
            <p style={{color: "#FFD700", borderRadius: "10px"}}>Late</p>
            <p>Location: BCC 180 Year Building</p>
            <p>4:12 PM</p>
          </Paper>
        </Paper>
        <br/>
        {/* Attendence summary */}
        <Paper
          sx={{
            p: 2,
            maxWidth: 600,
            minWidth: 300,
            height: "auto",
            // maxHeight: 200,
            marginLeft: "35px",
            marginRight: "20px",
            flexGrow: 1,
            backgroundColor: "#1A2027",
          }}
        >
          <h4>Attendence summary</h4>
          <Paper
            sx={{
              p: 2,
              margin: "20px",
              maxWidth: "auto",
              maxHeight: 3000,
              minHeight: "auto",
              flexGrow: 1,
              backgroundColor: "#1A24527",
              
            }}
          >
            <p>Present: 7</p>
            <p>Late: 1</p>
            <p>Absent: 0</p>
            <p>Leave: 0</p>
          </Paper>
        </Paper>
        </Grid>
      </div>
    </div>
  );

  const paymentsPage = (
    <div className={styles.section}>
      <div className={styles.strcontainer}>
        <h2>Payments</h2>
        <Card
          sx={{
            p: 2,
            margin: "20px",
            maxWidth: 600,
            // maxHeight: 200,
            flexGrow: 1,
            backgroundColor: "#1A2027",
          }}
        >
          <h4>student-payments.title</h4>
          <Card
            sx={{
              p: 2,
              margin: "20px",
              maxWidth: 500,
              maxHeight: 3000,
              flexGrow: 1,
              backgroundColor: "#1A24527",
            }}
          >
            <p style={{backgroundColor: "Green", padding: "5px", borderRadius: "10px"}}>student-payments.status()</p>

            <p>student-payments.amount()</p>

            <Button variant="contained" color="primary" style={{margin: "10px"}}> Pay now </Button>

            <p>student-payments.due()</p>
          </Card>
        </Card>
      </div>
    </div>
  );

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


  const currentPage = () => {
    switch (value) {
      case 0:
        return homePage;
      case 1:
        return attendencePage;
      case 2:
        return paymentsPage;
        
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
        <BottomNavigationAction label="Student" icon={<Icon>home</Icon>} />
        <BottomNavigationAction
          label="Attendence"
          icon={<Icon>schedule</Icon>}
        />
        <BottomNavigationAction label="Payments" icon={<Icon>payments</Icon>} />
        <BottomNavigationAction label="Settings" icon={<Icon>settings</Icon>} />
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </>
  );
}
