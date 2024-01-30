import AddIcon from "@mui/icons-material/Add";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import TodayIcon from "@mui/icons-material/Today";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Add from "./Screens/Add";
import All from "./Screens/All";
import Today from "./Screens/Today";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import MDBox from "../components/MDBox";
import MDAvatar from "../components/MDAvatar";
import MDTypography from "../components/MDTypography";
import axios from "axios";
import Connection from "../lib/Connection";

function Landingpage() {
  const [BottomNavigationState, setBottomNavigationState] = useState("TODAY");
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push("/Access");
    },
  });
  console.log("session", session);
  const Test = () => {
    Connection.get("/test");
  };
  return (
    <>
      <MDBox
        variant="gradient"
        bgColor="dark"
        borderRadius="lg"
        coloredShadow="dark"
        py={1}
        px={1}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span
          onClick={async () => {
            // Test();
            await signOut("google");
            Router.push("/Access");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <MDAvatar
            src={session?.user?.image}
            alt="Avatar"
            variant="circular"
            size="sm"
          ></MDAvatar>
          <MDTypography color="white" variant="body2">
            SignOut
          </MDTypography>
        </span>
      </MDBox>
      {BottomNavigationState === "TODAY" && <Today />}

      {BottomNavigationState === "ALL" && <All />}
      {BottomNavigationState === "ADD" && <Add />}

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={BottomNavigationState}
          onChange={(event, newValue) => {
            setBottomNavigationState(newValue);
          }}
        >
          <BottomNavigationAction
            label="TODAY"
            value="TODAY"
            icon={<TodayIcon />}
          />
          <BottomNavigationAction
            label="ALL"
            value="ALL"
            icon={<AllInboxIcon />}
          />
          <BottomNavigationAction label="ADD" value="ADD" icon={<AddIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Landingpage;
