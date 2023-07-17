import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "@mui/material/Button";
import styles from "@/styles/landing.module.css";
import settings from "@/utils/settings";
import { LinearProgress, Backdrop, Paper, Alert } from "@mui/material";
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
  const [error, setError] = useState("");

  const joinCode = router.query.joinCode as string;

  const fetchData = async () => {
    if(!router.isReady || !joinCode) return;
    console.log("Fetching data");
    if (!joinCode)return;
    try {
      const response = await fetch(
        settings.config.api_route + "/v1/user/self",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      const groupsData = await fetch(
        settings.config.api_route + "/v1/groups/code/" + joinCode,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const groups = await groupsData.json();
      console.log(groupsData);
      if (!groups.success || !groups.group || !groups) {
        return setData({
          title: "Error",
          description:
            "Invalid join code. Please tell your teacher to generate a new one.",
        });
      }


      setData({
        title: "You have been invited to join " + groups.group.name + "!",
        description: "Click the button below to join the group.",
      });

      if (data.success !== true) {
        return setError("You are not logged in. Please login before joining the group.");
      }

      if (!data.data.membership) {
        return setError("You are not a student, teacher, or parent. Please contact your teacher to join the group.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle any errors here
    }
  };

  useEffect(() => {
    fetchData();

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
      <div className={styles.section}>
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
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              {data?.title}
            </p>
            <p style={{ fontSize: "20px" }}> {data?.description} </p>
            
            {error && <Alert severity="error">{error}</Alert>}

            <Button
              variant="contained"
              color="warning"
              style={{ marginTop: "10px" }}
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
