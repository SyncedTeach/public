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
  LinearProgress,
  Fab,
  Backdrop,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Alert,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  AlertColor,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import settings from "@/utils/settings";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ReactMarkdown from "react-markdown";
import { useQRCode } from "next-qrcode";

interface Group {
  name: string;
  members: any[];
  owners: any[];
  joinCode: string;
  private: boolean;
  posts: any[];
}

interface IAssignmentPost {
  _id?: string;
  data: {
    dueDate: Date;
    maxScore: number;
    score?: number;
    title: string;
    description: string;
  };
  dateTime?: Date;
  ownerUsername?: string;
}

interface IExamPost {
  _id?: string;
  data: {
    dueDate: Date;
    maxScore: number;
    score?: number;
    title: string;
    description: string;
  };
  dateTime?: Date;
  ownerUsername?: string;
}

interface IAnnouncementPost {
  _id?: string;
  data: {
    title: string;
    description: string;
  };
  dateTime?: Date;
  ownerUsername?: string;
}

const samplePosts = [{}];

export default function Dashboard() {
  const [value, setValue] = useState(1);
  const [data, setData] = useState<Group>();
  const router = useRouter();

  const [creatingPost, setCreatingPost] = useState(false);
  const [postType, setPostType] = useState("announcement");
  const [postData, setPostData] = useState<any>([] as any[]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postDueDate, setPostDueDate] = useState<Dayjs | null>(dayjs());
  const [postMaxScore, setPostMaxScore] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  const [inviteQRopen, setInviteQROpen] = useState(false);

  //   get id query
  const { id } = router.query;

  const { Canvas } = useQRCode();

  const refreshData = async () => {
    if (id) {
      try {
        const groupResponse = await fetch(
          settings.config.api_route + "/v1/groups/" + id,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (groupResponse.status !== 200) {
          return router.push("/dashboard");
        }

        const groupData = await groupResponse.json();

        if (!groupData || !groupData.group) {
          return;
        }

        const group = groupData.group as Group;
        console.log(group);
        setData(group);

        const postsResponse = await fetch(
          settings.config.api_route + "/v1/posts/group/" + id,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const postsData = await postsResponse.json();

        if (!postsData || !postsData.posts || !postsData.success) {
          return;
        }

        const posts = postsData.posts as any[];
        console.log(posts);
        setData((prev) => {
          if (prev) {
            return { ...prev, posts: posts };
          }
          return prev;
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    refreshData();
    console.log(data?.posts);
    // Fetch data only if `id` is defined
    // refreshData(); after 2 seconds
  }, [router.isReady, id, router.reload, 2]);
  // const students = [
  //   {
  //       name: "Student 1",
  //       id: "38xx",
  //       number: "1",
  //       overdue: "1",
  //   },
  //   {
  //       name: "Student 2",
  //       id: "38xx",
  //       number: "2",
  //       overdue: "0",
  //   },
  //   {
  //       name: "Student 3",
  //       id: "38xx",
  //       number: "3",
  //       overdue: "0",
  //   },
  // ];

  const homePage = (
    <div className={styles.section}>
      <div className={styles.strcontainer}>
        <h2>Class - {data?.name}</h2>
        <br></br>
        <Grid container spacing={3}>
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

              <p style={{ color: "#42ba96" }}>assigned</p>
              {/* filter all posts with assignments type and get size abd check if posts exists */}
              <p style={{ fontSize: "20px" }}>
                {data?.posts != undefined
                  ? data?.posts.filter((post) => post.type === "assignment")
                      .length
                  : "No assignments"}
              </p>
              <br />
              <p style={{ color: "#FFD700" }}>overdue</p>
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
              <p style={{ color: "#FFD700" }}>subject</p>
              <p style={{ fontSize: "20px" }}>
                {data?.posts != undefined &&
                data?.posts.filter((post) => post.type === "exam").length > 0
                  ? data?.posts.filter((post) => post.type === "exam")[0].data
                      .title
                  : "No exams"}
              </p>
              <br />
              <p style={{ color: "#42ba96" }}>date</p>
              {/* filter latest exam */}
              <p style={{ fontSize: "20px" }}>
                {data?.posts != undefined &&
                data?.posts.filter((post) => post.type === "exam").length > 0
                  ? data?.posts.filter((post) => post.type === "exam")[0].data
                      .dueDate
                  : "..."}
              </p>
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
              {/* Invite code */}
              <h3 style={{ color: "white" }}>Invite Code</h3>
              <br />
              <p style={{ color: "#42ba96" }}>code</p>
              <p style={{ fontSize: "20px" }}>{data?.joinCode}</p>
              <br />
              <p style={{ color: "#FFD700" }}>QR Code</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setInviteQROpen(true)}
              >
                Generate QR Code
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const studentsPage = (
    <div className={styles.section}>
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
            {data?.members.map(
              (item: {
                id: string;
                username: string;
                // number: string;
                // overdue: string;
              }) => (
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
                    <h3 style={{ color: "white" }}>
                      {item.username} - {item.id}
                    </h3>
                    {/* <p>Number - {item.number}</p> */}
                    {/* <p style={{ color: "#ff0000" }}>Overdue - {item.overdue}</p> */}
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        </div>
      </div>
    </div>
  );

  const postsPage = (
    <div className={styles.section}>
      <div className={styles.strcontainer}>
        {/* listing classes */}
        <h2>Posts</h2>
        <br></br>
        <div>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            {data?.posts &&
              data?.posts.map(
                (item: {
                  _id: string;
                  type: string;
                  data: {
                    title: string;
                    description: string;
                    dueDate?: Date;
                    maxScore?: number;
                    score?: number;
                  };
                  dateTime: Date;
                  ownerUsername: string;
                }) => {
                  if (item.type === "announcement") {
                    const announcementPost = item as IAnnouncementPost;
                    return (
                      <Grid item xs={12} sm={6} key={announcementPost._id}>
                        <Paper
                          sx={{
                            p: 2,
                            margin: "auto",
                            maxWidth: 700,
                            flexGrow: 1,
                            backgroundColor: "#1A2027",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              // telescope
                              icon={<Icon>campaign</Icon>}
                              label={"Announcement"}
                              style={{
                                backgroundColor: "#42ba96",
                                color: "white",
                              }}
                            />
                          </div>
                          <div>
                            <h3 style={{ color: "white" }}>
                              {item.data.title}
                            </h3>
                            {/* {md.render(item.data.description)} */}
                            <div style={{ textAlign: "left" }}>
                              {/* markdown using react-markdown */}
                              <ReactMarkdown>
                                {item.data.description}
                              </ReactMarkdown>
                            </div>
                          </div>
                          {/* </div> */}
                          {/* <p>Due Date - {item.dueDate.getTime()}</p> */}
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              label={"Posted by " + item.ownerUsername}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />

                            <Chip
                              label={"Posted on " + item.dateTime}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                        </Paper>
                      </Grid>
                    );
                  } else if (item.type === "assignment") {
                    const assignmentPost = item as IAssignmentPost;
                    return (
                      <Grid item xs={12} sm={6} key={assignmentPost._id}>
                        <Paper
                          sx={{
                            p: 2,
                            margin: "auto",
                            maxWidth: 700,
                            flexGrow: 1,
                            backgroundColor: "#1A2027",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              icon={<Icon>assignment</Icon>}
                              label={"Assignment"}
                              style={{
                                // yellow
                                backgroundColor: "#ff9800",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={
                                item.data.score +
                                "/" +
                                item.data.maxScore +
                                " Points"
                              }
                              style={{
                                backgroundColor: "#42ba96",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={"Due on " + item.data.dueDate}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                          <h3 style={{ color: "white" }}>{item.data.title}</h3>
                          <div style={{ textAlign: "left" }}>
                            {/* markdown using react-markdown */}
                            <ReactMarkdown>
                              {item.data.description}
                            </ReactMarkdown>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              label={"Posted by " + item.ownerUsername}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />

                            <Chip
                              label={"Posted on " + item.dateTime}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                        </Paper>
                      </Grid>
                    );
                  } else if (item.type === "exam") {
                    const examPost = item as IExamPost;
                    return (
                      <Grid item xs={12} sm={6} key={examPost._id}>
                        <Paper
                          sx={{
                            p: 2,
                            margin: "auto",
                            maxWidth: 700,
                            flexGrow: 1,
                            backgroundColor: "#1A2027",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              icon={<Icon>assignment</Icon>}
                              label={"Exam"}
                              style={{
                                // yellow
                                backgroundColor: "#f44336",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={
                                item.data.score +
                                "/" +
                                item.data.maxScore +
                                " Points"
                              }
                              style={{
                                backgroundColor: "#42ba96",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={"Due on " + item.data.dueDate}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                          <h3 style={{ color: "white" }}>{item.data.title}</h3>
                          <div style={{ textAlign: "left" }}>
                            {/* markdown using react-markdown */}
                            <ReactMarkdown>
                              {item.data.description}
                            </ReactMarkdown>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Chip
                              label={"Posted by " + item.ownerUsername}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />

                            <Chip
                              label={"Posted on " + item.dateTime}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                        </Paper>
                      </Grid>
                    );
                  }
                  return null; // Ignore posts with other types
                }
              )}
          </Grid>
          {/* bottom + floaty Create post button */}
          <div style={{ position: "fixed", bottom: "70px", right: "20px" }}>
            <Fab color="primary" aria-label="add">
              <IconButton
                aria-label="add"
                color="inherit"
                size="large"
                onClick={(e) => setCreatingPost(true)}
              >
                <Icon style={{ color: "white" }}>add</Icon>
              </IconButton>
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );

  const createPost = async (postData: any) => {
    const formattedRequest = {
      content: "uploaded from web",
      type: postType,
      targetgroup: id,
      data: postData.data,
    };
    try {
      fetch(settings.config.api_route + "/v1/posts/new", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedRequest),
      })
        .then((res) => {
          if (res.status !== 200) {
            //   <Snackbar
            //   open={true}
            //   autoHideDuration={6000}
            // >
            //   <Alert severity="error">
            //     Error occured while creating post ({res.status})
            //   </Alert>
            // </Snackbar>
            setAlertMessage(
              "Error occured while creating post (" + res.status + ")"
            );
            setAlertType("error");
            setAlertOpen(true);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            //   <Snackbar
            //   open={true}
            //   autoHideDuration={6000}
            // >
            //   <Alert severity="success">
            //     Post created successfully
            //   </Alert>
            // </Snackbar>
            setAlertMessage("Post created successfully");
            setAlertType("success");
            setAlertOpen(true);

            setCreatingPost(false);
            setPostTitle("");
            setPostDescription("");
            setPostType("announcement");
            setPostDueDate(null);
            setPostMaxScore("");
            refreshData();
          } else {
            setAlertMessage("Error creating post: " + data.error);
            setAlertType("error");
            setAlertOpen(true);

            //   <Snackbar
            //   open={true}
            //   autoHideDuration={6000}
            // >
            //   <Alert severity="error">
            //     Error occured while creating post
            //   </Alert>
            // </Snackbar>
          }
        });
    } catch (err) {
      // alert("Error creating post: " + err);
      // <Snackbar
      //   open={true}
      //   autoHideDuration={6000}
      // >
      //   <Alert severity="error">
      //     Error occured while creating post
      //   </Alert>
      // </Snackbar>
      setAlertMessage("Error occured while creating post");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  const handleCreatePost = async () => {
    if (postType === "announcement") {
      const announcementPostData: IAnnouncementPost = {
        data: {
          title: postTitle,
          description: postDescription,
        },
      };
      await createPost(announcementPostData);
    }
    if (postType === "assignment") {
      if (!postDueDate) {
        alert("Please select a due date");
        return;
      }
      const assignmentPost: IAssignmentPost = {
        data: {
          title: postTitle,
          description: postDescription,
          dueDate: postDueDate?.toDate(),
          maxScore: Number(postMaxScore),
          score: "?" as any,
        },
      };
      await createPost(assignmentPost);
    }
    if (postType === "exam") {
      if (!postDueDate) {
        alert("Please select a due date");
        return;
      }
      const examPost: IExamPost = {
        data: {
          title: postTitle,
          description: postDescription,
          dueDate: postDueDate?.toDate(),
          maxScore: Number(postMaxScore),
          score: "?" as any,
        },
      };
      await createPost(examPost);
    }
    setCreatingPost(false);
  };

  const createPostPage = (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={creatingPost}
      // onClick={() => setCreatingPost(false)}
    >
      <div
        style={{
          backgroundColor: "#1A2027",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "700px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "white" }}>Create Post</h2>
          <IconButton
            aria-label="close"
            color="inherit"
            size="large"
            onClick={() => setCreatingPost(false)}
          >
            <Icon style={{ color: "white" }}>close</Icon>
          </IconButton>
        </div>
        <Divider />
        <div style={{ padding: "20px" }}>
          {/* types */}
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={postType}
              label="Type"
              onChange={(e) => setPostType(e.target.value as string)}
            >
              <MenuItem value={"announcement"}>Announcement</MenuItem>
              <MenuItem value={"assignment"}>Assignment</MenuItem>
              <MenuItem value={"exam"}>Exam</MenuItem>
            </Select>
            {/* custom fourm for each type */}
            {postType === "announcement" && (
              <div style={{ marginTop: "20px" }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Title"
                  multiline
                  fullWidth
                  rows={1}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                />
              </div>
            )}
            {postType === "assignment" && (
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Title"
                  multiline
                  fullWidth
                  rows={1}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                />
                {/* date selector */}
                <DatePicker
                  label="Due Date"
                  value={postDueDate}
                  onChange={(newValue) => setPostDueDate(newValue)}
                />
                {/* points */}
                <TextField
                  id="outlined-multiline-static"
                  label="Points"
                  multiline
                  rows={1}
                  value={postMaxScore}
                  onChange={(e) => setPostMaxScore(e.target.value)}
                />
              </div>
            )}
            {postType === "exam" && (
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Title"
                  multiline
                  fullWidth
                  rows={1}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                />
                {/* date selector */}
                <DatePicker
                  label="Exam Date"
                  value={postDueDate}
                  onChange={(newValue) => setPostDueDate(newValue)}
                />
                {/* points */}
                <TextField
                  id="outlined-multiline-static"
                  label="Points"
                  multiline
                  rows={1}
                  value={postMaxScore}
                  onChange={(e) => setPostMaxScore(e.target.value)}
                />
              </div>
            )}
            {/* submit button */}
            <Button
              variant="contained"
              fullWidth
              style={{ marginTop: "20px" }}
              onClick={() => handleCreatePost()}
            >
              Create Post
            </Button>
          </FormControl>
        </div>
      </div>
    </Backdrop>
  );
  const currentPage = () => {
    switch (value) {
      case 1:
        return homePage;
      case 2:
        return postsPage;
      case 3:
        return studentsPage;
    }
  };

  const inviteQR = (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={inviteQRopen}
      onClick={() => setInviteQROpen(false)}
    >
      <div
        style={{
          backgroundColor: "#1A2027",
          borderRadius: "10px",
          width: "auto",
          maxWidth: "700px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "white" }}>Invite Code</h2>
          <IconButton
            aria-label="close"
            color="inherit"
            size="large"
            onClick={() => setInviteQROpen(false)}
          >
            <Icon style={{ color: "white" }}>close</Icon>
          </IconButton>
        </div>
        <Divider />
        <div
          style={{
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Canvas
            text={
              "https://syncedteach.phatlor.me/invite/" + data?.joinCode ??
              "Loading..."
            }
          />
        </div>
      </div>
    </Backdrop>
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        style={{ bottom: "70px" }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {inviteQR}
      {createPostPage}
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
        <BottomNavigationAction label="Posts" icon={<Icon>post_add</Icon>} />
        <BottomNavigationAction label="Students" icon={<Icon>people</Icon>} />
        {/* <BottomNavigationAction
          label="Assignment"
          icon={<Icon>assignment</Icon>}
        />
        <BottomNavigationAction label="Exams" icon={<Icon>quiz</Icon>} /> */}
        {/* Posts */}
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </>
  );
}
