import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import settings from "@/utils/settings";
import { LinearProgress, Backdrop, Paper } from "@mui/material";
import Image from "next/image";

interface IData {
  title: string;
  description: string;
}

export default function Join() {
  const router = useRouter();
  const [data, setData] = useState<IData>({
    title: "Loading...",
    description: "...",
  });

  const [loading, setLoading] = useState(true);

  const joinCode = router.query.joinCode as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(settings.config.api_route + "/v1/user/self", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success !== true) {
          return router.push("/user/login");
        }

        if (!data.data.membership) {
          return router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle any errors here
      }
    };
    console.log("Join code: " + joinCode);
  }, [router.isReady]);

  const handleJoinGroup = () => {
    setLoading(true);
    console.log("Entered: " + joinCode);
    fetch(`${settings.config.api_route}/v1/groups/join/` + joinCode, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success !== true) {
          // console.log("error " + res.data);
          data.description = "Error joining group: " + res.data;
          setLoading(false);
          return Promise.resolve(false);
        }
        router.push(`/dashboard`);
        setLoading(false);
        return true;
      });
  };

  return (
    <>
      <div className={styles.section1}>
        <div className={styles.strcontainer}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
          <Image
              src="/favicon.ico"
              alt="SyncedTeach logo"
              width={64}
              height={64}
              priority
              style={{ margin: "10px", borderRadius: "10px" }}
            />
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>{data?.title}</p>
            <p style={{ fontSize: "20px" }}> {data?.description} </p>

            <Button
              variant="contained"
              color="warning"
              style={{ marginTop: "10px"}}
              onClick={() => router.push("/dashboard")}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={data?.title === "Loading..." || loading}
              style={{ marginTop: "10px", marginLeft: "10px" }}
              onClick={handleJoinGroup}
            >
              Join
            </Button>

            </Paper>
          </div>
      </div>
    </>
  );
}
