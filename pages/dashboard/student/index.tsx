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
  Chip,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import settings from "@/utils/settings";
import { Group } from "@mui/icons-material";

interface Group {
  name: string;
  members: any[];
  owners: any[];
  joinCode: string;
  private: boolean;
  posts: any[];
}

interface IPost {
  _id?: string;

  dateTime?: Date;
  ownerUsername?: string;
}
interface IAssignmentPost extends IPost {
  data: {
    dueDate: Date;
    maxScore: number;
    score?: number;
    title: string;
    description: string;
  };
}

interface IExamPost extends IPost {
  data: {
    dueDate: Date;
    maxScore: number;
    score?: number;
    title: string;
    description: string;
  };
}

interface IAnnouncementPost extends IPost {
  data: {
    title: string;
    description: string;
  };
}

interface IData {
  username: String;
  groups: [];
  allPosts: Array<IPost>;
}

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const [manualJoinCode, setManualJoinCode] = useState<string>("");
  const [data, setData] = useState<IData>({
    username: "...",
    groups: [],
    allPosts: [],
  });

  const [alreadySeenPosts, setAlreadySeenPosts] = useState<any[]>([]);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState<number>(0);
  const [unreadAssignments, setUnreadAssignments] = useState<number>(0);
  const [unreadExams, setUnreadExams] = useState<number>(0);

  const [postTypeSee, setPostTypeSee] = useState<string>("all");
  const [postSortBy, setPostSortBy] = useState<string>("Post Date");

  useEffect(() => {
    router.push(`/dashboard/student?page=${value}`);
  }, [value]);

  const fetchingData = async () => {
    fetch(settings.config.api_route + "/v1/user/self", {
      method: "GET",
      credentials: "include",
    })
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

    // groups
    fetch(settings.config.api_route + "/v1/user/self/student", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success !== true) {
          console.log("error " + res.data);
          router.push("/dashboard");
          return Promise.resolve(false); // Return a promise that resolves to false
        }
        // Parameter 'prev' implicitly has an 'any' type.ts(7006)
        // @ts-ignore
        setData((prev) => ({ ...prev, groups: res.data.groups }));
        console.log(res.data);
        return true; // Return true
      });

    // posts
    fetch(settings.config.api_route + "/v1/posts/self", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success !== true) {
          console.log("error " + res.data);
          router.push("/dashboard");
          return Promise.resolve(false); // Return a promise that resolves to false
        }
        // Parameter 'prev' implicitly has an 'any' type.ts(7006)
        // @ts-ignore
        setData((prev) => ({ ...prev, allPosts: res.posts }));
        console.log(res.posts);

        return true; // Return true
      });
  };

  useEffect(() => {
    if (data?.allPosts == null) return;

    // sort posts by date NoZeroReturnedInSort: The callback provided to sort should return 0 if the compared values are equal...Snyk Codejavascript/NoZeroReturnedInSort
    data?.allPosts.sort((a: IPost, b: IPost) => {
      // if (a.dateTime === b.dateTime) return

      return new Date(b.dateTime || "") > new Date(a.dateTime || "") ? 1 : -1;
    });

    // unread posts by getting post that is already read
    if (localStorage.getItem("readPosts") === null) {
      localStorage.setItem("readPosts", "[]");
    }
    const readPosts = JSON.parse(localStorage.getItem("readPosts") || "[]");
    readPosts.forEach((post: any) => {
      // console.log("read: " + post.postID);
      alreadySeenPosts.push(post.postID);
    });
    const unreadPosts = data.allPosts.filter(
      (post: any) => !alreadySeenPosts.includes(post._id)
    );
    // unreadPosts.forEach((post: any) => {
    //   console.log("unread: " + post._id);
    // });
    setUnreadAssignments(
      unreadPosts.filter((post: any) => post.type === "assignment").length
    );
    setUnreadExams(
      unreadPosts.filter((post: any) => post.type === "exam").length
    );
    setUnreadAnnouncements(
      unreadPosts.filter((post: any) => post.type === "announcement").length
    );
  }, [data, router.isReady, alreadySeenPosts, data?.allPosts, data?.groups]);

  const handleReadPost = (postID: string | any, type: string) => {
    if (alreadySeenPosts.includes(postID)) return;

    const readPosts = JSON.parse(localStorage.getItem("readPosts") || "[]");
    readPosts.push({ postID, type });
    alreadySeenPosts.push(postID);
    localStorage.setItem("readPosts", JSON.stringify(readPosts));
    if (type === "assignment") {
      setUnreadAssignments(unreadAssignments - 1);
    }
    if (type === "exam") {
      setUnreadExams(unreadExams - 1);
    }
    if (type === "announcement") {
      setUnreadAnnouncements(unreadAnnouncements - 1);
    }
  };

  useEffect(() => {
    if (router.query.page) {
      setValue(parseInt(router.query.page as string));
    }
    fetchingData();
  }, [router.isReady]);

  const handlePostTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPostTypeSee(event.target.value as string);
  };

  const handleJoinGroup = () => {
    console.log("Entered: " + manualJoinCode);
    fetch(`${settings.config.api_route}/v1/groups/join/` + manualJoinCode, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success !== true) {
          // console.log("error " + res.data);
          return Promise.resolve(false);
        }
        // router.push(`/dashboard/teacher/class?id=${res.groupID}`);
        fetchingData();

        return true;
      });
  };
  const homePage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        <h2>
          Hey {data?.username}, Don&apos;t forget to check all your work!{" "}
        </h2>
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
              <h3 style={{ color: "white" }}>Summary</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "30px", marginRight: "10px" }}>
                  {unreadAnnouncements}
                </p>
                {/* yellow */}
                <p style={{ color: "#42ba96", fontSize: "20px" }}>
                  Un checked announcements
                  {unreadAnnouncements > 0 && (
                    <Chip
                      label="New"
                      style={{
                        backgroundColor: "#42ba96",
                        color: "black",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "30px", marginRight: "10px" }}>
                  {unreadAssignments}
                </p>
                <p style={{ color: "#FFD700", fontSize: "20px" }}>
                  Un checked assignments
                  {unreadAssignments > 0 && (
                    <Chip
                      label="New"
                      style={{
                        backgroundColor: "#FFD700",
                        color: "black",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "30px", marginRight: "10px" }}>
                  {unreadExams}
                </p>
                <p style={{ color: "#ff0000", fontSize: "20px" }}>
                  Up coming exams this week
                  {unreadExams > 0 && (
                    <Chip
                      label="New"
                      style={{
                        backgroundColor: "#ff0000",
                        color: "black",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const subjectPage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        {/* listing classes */}
        <h2>Subject</h2>
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
            value={manualJoinCode}
            onChange={(e) => setManualJoinCode(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "#42ba96" }}
            onClick={handleJoinGroup}
          >
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
            {data?.groups &&
              data?.groups.map(
                (item: {
                  id: string;
                  name: string;
                  description: string;
                  size: string;
                  owner: string;
                  code: string;
                  postsSize: {
                    announcements: number;
                    assignments: number;
                    exams: number;
                  };
                }) => {
                  return (
                    <Grid item xs={12} key={item.id}>
                      <Card
                        sx={{
                          p: 2,
                          margin: "auto",
                          maxWidth: 500,
                          maxHeight: "auto",
                          flexGrow: 1,
                          backgroundColor: "#1A2027",
                          // center
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <h3 style={{ color: "white" }}>{item.name}</h3>
                        <p style={{ color: "#42ba96" }}>{item.description}</p>
                        <div
                          style={{
                            padding: "10px",
                            backgroundColor: "#1A2027",
                            borderRadius: "20px",
                            minWidth: "auto",
                            width: "fit-content",
                          }}
                        >
                          <Chip
                            label={item.size + " members"}
                            style={{
                              backgroundColor: "#42ba96",
                              color: "black",
                            }}
                          />
                          <Chip
                            label={item.owner}
                            style={{
                              backgroundColor: "#42ba96",
                              color: "black",
                              marginLeft: "10px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            margin: "5px",
                            padding: "10px",
                            backgroundColor: "#1A2027",
                            borderRadius: "20px",
                          }}
                        >
                          {/* Posts, assignments, exams size */}
                          <Chip
                            label={
                              item.postsSize.announcements + " Announcements"
                            }
                            style={{
                              backgroundColor: "#42ba96",
                              color: "black",
                            }}
                          />
                          <Chip
                            label={item.postsSize.assignments + " Assignments"}
                            style={{
                              backgroundColor: "#ff9800",
                              color: "black",
                              marginLeft: "10px",
                            }}
                          />
                          <Chip
                            label={item.postsSize.exams + " Exams"}
                            style={{
                              backgroundColor: "#f44336",
                              color: "black",
                              marginLeft: "10px",
                            }}
                          />
                        </div>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#42ba96" }}
                          onClick={() => {
                            router.push(
                              `/dashboard/student/class?id=${item.id}`
                            );
                          }}
                        >
                          View Class
                        </Button>
                      </Card>
                    </Grid>
                  );
                }
              )}
          </Grid>
        </div>
      </div>
    </div>
  );

  const postsPage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        {/* listing classes */}
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Posts
        </h2>
        <br></br>
        <div>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 700,
                flexGrow: 1,
                backgroundColor: "#1A2027",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{margin: "10px"}}>
                <p>
                  <b>Filter by:</b>
                </p>
                <Select
                  value={postTypeSee}
                  onChange={(e) => {
                    if (e.target.value === "all" || e.target.value === "announcement") {
                      console.log(e.target.value)
                      setPostSortBy("date" as string);
                    }
                    setPostTypeSee(e.target.value as string)
                  }}

                  label="All"
                  style={{
                    color: "white",
                    backgroundColor: "#2A2F36",
                    width: "fit-content",
                    minWidth: "100px ",
                    textAlign: "center",
                    marginLeft: "auto",
                  }}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"announcement"}>Announcement</MenuItem>
                  <MenuItem value={"assignment"}>Assignment</MenuItem>
                  <MenuItem value={"exam"}>Exam</MenuItem>
                </Select>
              </div>

              <div style={{margin: "10px"}}>
                <p>
                  <b>Sort by:</b>
                </p>
                <Select
                  value={postSortBy}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setPostSortBy(e.target.value as string)}}
                  label="Date"
                  style={{
                    color: "white",
                    backgroundColor: "#2A2F36",
                    width: "fit-content",
                    minWidth: "100px ",
                    textAlign: "center",
                    marginLeft: "auto",
                  }}
                >
                  <MenuItem value={"date"}>Post Date</MenuItem>
                  <MenuItem value={"score"} disabled={
                    postTypeSee === "all" || postTypeSee === "announcement"
                  }>Score</MenuItem>
                </Select>
              </div>
            </Paper>

            {data?.allPosts &&
              data?.allPosts.map(
                (item: {
                  _id?: string;
                  type?: string;
                  data?: {
                    title?: string;
                    description?: string;
                    dueDate?: Date;
                    maxScore?: number;
                    score?: number;
                  };
                  dateTime?: Date;
                  ownerUsername?: string;
                }) => {
                  if (
                    item.type === "announcement" &&
                    (postTypeSee === "announcement" || postTypeSee === "all")
                  ) {
                    const announcementPost = item as IAnnouncementPost;
                    return (
                      <Grid item xs={12} sm={6} key={announcementPost._id}>
                        {/* on the left */}

                        <Paper
                          sx={{
                            p: 2,
                            margin: "auto",
                            maxWidth: 700,
                            flexGrow: 1,
                            backgroundColor: "#1A2027",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            // history.push("/exam/" + examPost._id);
                            handleReadPost(
                              announcementPost._id,
                              "announcement"
                            );
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Badge
                              badgeContent="New"
                              color="error"
                              invisible={alreadySeenPosts.includes(
                                announcementPost._id
                              )}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
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
                            </Badge>
                          </div>
                          <h3 style={{ color: "white" }}>
                            {item?.data?.title}
                          </h3>
                          <p>{item?.data?.description}</p>
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
                  } else if (
                    item.type === "assignment" &&
                    (postTypeSee === "assignment" || postTypeSee === "all")
                  ) {
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
                          onClick={(e) => {
                            // history.push("/exam/" + examPost._id);
                            handleReadPost(assignmentPost._id, "assignment");
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Badge
                              badgeContent="New"
                              color="error"
                              invisible={alreadySeenPosts.includes(
                                assignmentPost._id
                              )}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
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
                            </Badge>

                            <Chip
                              label={
                                item?.data?.score +
                                "/" +
                                item?.data?.maxScore +
                                " Points"
                              }
                              style={{
                                backgroundColor: "#42ba96",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={"Due on " + item?.data?.dueDate}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                          <h3 style={{ color: "white" }}>
                            {item?.data?.title}
                          </h3>
                          <p>{item?.data?.description}</p>
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
                  } else if (
                    item.type === "exam" &&
                    (postTypeSee === "exam" || postTypeSee === "all")
                  ) {
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
                          onClick={(e) => {
                            // history.push("/exam/" + examPost._id);
                            handleReadPost(examPost._id, "exam");
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <Badge
                              badgeContent="New"
                              color="error"
                              invisible={alreadySeenPosts.includes(
                                examPost._id
                              )}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
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
                            </Badge>
                            <Chip
                              label={
                                item?.data?.score +
                                "/" +
                                item?.data?.maxScore +
                                " Points"
                              }
                              style={{
                                backgroundColor: "#42ba96",
                                color: "white",
                              }}
                            />
                            <Chip
                              label={"Due on " + item?.data?.dueDate}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                              }}
                            />
                          </div>
                          <h3 style={{ color: "white" }}>{item?.data?.title}</h3>
                          <p>{item?.data?.description}</p>
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
        </div>
      </div>
    </div>
  );

  const todoPage = (
    <div className={styles.section1}>
      <div className={styles.strcontainer}>
        <h2>Todo</h2>
        <p>Todo</p>
      </div>
    </div>
  );

  const currentPage = () => {
    switch (value) {
      case 0:
        return homePage;
      case 1:
        return subjectPage;
      case 2:
        return postsPage;
      case 3:
        return todoPage;
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
        <BottomNavigationAction label="Subject" icon={<Icon>class</Icon>} />
        {/* Posts */}
        <BottomNavigationAction
          label="Posts"
          icon={
            <Badge
              color="error"
              badgeContent={
                unreadAnnouncements + unreadAssignments + unreadExams
              }
            >
              <Icon>post_add</Icon>
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Todo"
          icon={<Icon>format_list_bulleted</Icon>}
        />
        <BottomNavigationAction label="Settings" icon={<Icon>settings</Icon>} />
        {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      </BottomNavigation>
    </>
  );
}
