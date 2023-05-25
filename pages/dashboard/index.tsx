import Head from "next/head";
import Image from "next/image";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import LandingUserOptions from "@/components/LandingUserOptions";
import "@/styles/globals.css";
import { useEffect } from "react";
import settings from "@/utils/settings";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    fetch(settings.config.api_route + "/v1/user", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success !== true) {
          // return router.push("/user/login");
          return router.push("/user/login");
        }
        if(res.data.membership.isTeacher == true){
          return router.push("/dashboard/teacher");
        }
        if(res.data.membership.isStudent == true){
          return router.push("/dashboard/student");
        }
        if(res.data.membership.isParent == true){
          return router.push("/dashboard/parent");
        }
      });
  }, []);
    
  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
    
        <div className={styles.section1}>
            <div className={styles.strcontainer}>
                <h1>SyncedTeach</h1>
                <>Thank you for registering. seems like you&apos;re not in any of our user_type (Teacher,Student,Parent) if you think this is an error you can click the button bellow and follow the instruction</>
                <br></br>
                <Button variant="contained" onClick={() => router.push("/user/setup")}>Setup Account</Button>
                </div>
            </div>

    </>
  );
}
