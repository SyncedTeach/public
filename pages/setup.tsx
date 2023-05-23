import Head from "next/head";
import styles from "@/styles/landing.module.css";
import "@/styles/globals.css";
import {
  Alert,
  Button,
  Input,
  InputLabel,
  LinearProgress,
  Link,
  TextField,
} from "@mui/material";
import { use, useEffect, useState } from "react";

export default function Custom404() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(0);

  const [apiRoute, setApiRoute] = useState("");
  const [apiSecretKey, setApiSecretKey] = useState("");
  const [mongoDBConnectionString, setMongoDBConnectionString] = useState("");
  const [error, setError] = useState("");

  const titleList = ["SyncedTeach", "Let's get started!", "API Verify", "Database", "Verify", "Setup Complete!"];
  const descriptionList = [
    "SyncedTeach is a platform for teachers to create and share their lessons with students.",
    "Please enter the route to your api server.",
    "Now we need the api secret key. Please enter it below. you can find it in the .env file of the api server.",
    "Now we need the connection string to your MongoDB database. Please enter it below.",
    "Please verify the information you have entered is correct.",
    "Done! Dont forget to restart the api server to fully apply the changes."
  ];

  useEffect(() => {
    if (page < 2) {
      setTimeout(() => {
        setTitle(titleList[page]);
        setDescription(descriptionList[page]);
        setPage(page + 1);
      }, 1500);
    }else{
      // console.log(page);
      setTitle(titleList[page-1]);
      setDescription(descriptionList[page-1]);
    }
  }, [page]);


  const validateApiRoute = (apiRoute:string) => {
    // Define the regular expression pattern for the expected API route format
    const apiRoutePattern = /^\/v1\/[a-z0-9\-\/]+$/i;
  
    // Test the apiRoute against the pattern
    return apiRoutePattern.test(apiRoute);
  };

  const handleChange = (event:any) => {
    const inputValue = event.target.value;

    if (!validateApiRoute(inputValue)) {
      setError("Invalid API Route");
    } else {
      setError("");
      setApiRoute(inputValue);
    }
  };

  const handleP2Next = async () => {
    try {
      await fetch(`${apiRoute}/v1/setup/check`).then((data) => data.json()).then((data) => {
        if (data.result.setup == false) {
          setError("");
          setPage(page+1);
        }else{
          setError("API is already setup. Please go to the admin panel to change the settings.");
        }
      });
    } catch (error) {
      setError("Invalid API Route");
      return;
    }  
  };

  const page2 = (
    <div id="page2"
      style={{
        backgroundColor: "#222222",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
      <InputLabel htmlFor="my-input" style={{ color: "white" }}>
        API Route
      </InputLabel>
      <p style={{ fontSize: "15px" }}>
        Preview project api: https://st-preview-api.phatlor.me
      </p>
      <Input
        value={apiRoute}
        placeholder="API Route"
        inputProps={{ "aria-label": "description" }}
        style={{
          color: "white",
          margin: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.55)",
          padding: "10px",
          borderRadius: "15px",
        }}
        onChange={(event) => {
        
          handleChange(event.target.value)
        }}
      />
      <br />
      
      <Button
        variant="contained"
        type="submit"
        style={{ margin: "10px" }}
        onClick={handleP2Next}
      >
        Next
      </Button>
    </div>
  );


  const handleP3Next = async () => {
    try {
      await fetch(`${apiRoute}/v1/setup/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secretKey: apiSecretKey,
        }),
      }).then((data) => data.json()).then((data) => {
        if (data.result.isValid == true) {
          setError("");
          setPage(page+1);
        }else{
          setError("Invalid API Secret Key");
        }
      });
    } catch (error) {
      setError("Error validating API Secret Key " + error);
      return;
    }
  };


  const page3 = (
    // api database setup
    <div
      style={{
        backgroundColor: "#222222",
        padding: "10px",
        borderRadius: "20px",
      }}>

      <InputLabel htmlFor="my-input" style={{ color: "white" }}>
        API Secret Key
      </InputLabel>
      <p style={{ fontSize: "15px" }}>
        You can find this in the .env file of the api server.
      </p>
      <Input
        value={apiSecretKey}
        placeholder="API Secret Key"
        inputProps={{ "aria-label": "description" }}
        style={{
          color: "white",
          margin: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.55)",
          padding: "10px",
          borderRadius: "15px",
        }}
        onChange={(event) => {setApiSecretKey(event.target.value)}}
      />


      <br />

      <Button
        variant="contained"
        type="submit"
        style={{ margin: "10px" }}
        onClick={handleP3Next}
      >
        Next
      </Button>

      </div>      
  );  

  const handleP4Next = async () => {
    // check if its a valid connection string
    if(mongoDBConnectionString == "" || (!mongoDBConnectionString.includes("mongodb+srv") && !mongoDBConnectionString.includes("mongodb"))){
      setError("Invalid MongoDB Connection String");
      return;
    }

    setError("");
    setPage(page+1);
  };

  const page4 = (
    // api database setup
    <div
      style={{
        backgroundColor: "#222222",
        padding: "10px",
        borderRadius: "20px",
      }}>

      <InputLabel htmlFor="my-input" style={{ color: "white" }}>
        Connection String
      </InputLabel>
      <p style={{ fontSize: "15px" }}>
        Please enter the connection string to your MongoDB database.
      </p>
      <Input
        value={mongoDBConnectionString}
        placeholder="Connection String"
        inputProps={{ "aria-label": "description" }}
        style={{
          color: "white",
          margin: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.55)",
          padding: "10px",
          borderRadius: "15px",
        }}
        onChange={(event) => {setMongoDBConnectionString(event.target.value)}}
      />

      <br />

      <Button
        variant="contained"
        type="submit"
        style={{ margin: "10px" }}
        onClick={handleP4Next}
      >
        Next
      </Button>
      </div>
      );

    const handleP5Next = async () => {
      try{
        fetch(`${apiRoute}/v1/setup/finish`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secretKey: apiSecretKey,
            mongoDBConnectionString: mongoDBConnectionString,
          }),
        }).then((data) => data.json()).then((data) => {
          if (data.result.success == true) {
            setError("");
            setPage(page+1);
          }else{
            setError("Error finishing setup: " + data.result.message);
          }
        }
        );
      }catch(error){
        setError("Error finishing setup " + error);
        return;
      }
    };

    const page5 = (
      // verify all the information
      <div
        style={{
          backgroundColor: "#222222",
          padding: "10px",
          borderRadius: "20px",
        }}>
        <details style={{ color: "white" }}>
          <summary>API Route</summary>
          {apiRoute}
        </details>

        <details style={{ color: "white" }}>
          <summary>API Secret Key</summary>
          {apiSecretKey}
        </details>

        
        <details style={{ color: "white" }}>
          <summary>MongoDB Connection String</summary>
          {mongoDBConnectionString}
        </details>
        {/* spoiler */}
        <p style={{ fontSize: "15px" }}>
        </p>


        <Button
          variant="contained"
          type="submit"
          style={{ margin: "10px" }}
          onClick={handleP5Next}
        >
          Confirm
        </Button>
        </div>
        );

  const contentPerPage = function () {
    switch (page) {
      case 2:
        return page2;
      case 3:
        return page3;
      case 4:
        return page4;
      case 5:
        return page5;
      default:
        return <LinearProgress />;
    }
  };

  return (
    <>
      <Head>
        <title>SyncedTeach</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div className={styles.section1}>
        <div className={styles.strcontainer}>
          <h1>{title}</h1>
          <p>{description}</p>
          {error !== "" ? (
              <Alert severity="error" style={{ margin: "10px" }}>
                {error}
              </Alert>
            ) : (
              <></>
            )}
          {contentPerPage()}
        </div>
      </div>
    </>
  );
}
