import AddIcon from "@mui/icons-material/Add";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import TodayIcon from "@mui/icons-material/Today";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import MDAvatar from "../components/MDAvatar";
import MDBox from "../components/MDBox";
import MDTypography from "../components/MDTypography";
import connection from "../lib/Connection";
import Add from "./Screens/Add";
import All from "./Screens/All";
import Today from "./Screens/Today";
import MDButton from "../components/MDButton";
import { toast, ToastContainer } from "react-toastify";
import { deleteExpenseObject } from "../lib/utils";

function Landingpage() {
  const fetcher = (url) => connection.get(url).then((res) => res.data);
  const [BottomNavigationState, setBottomNavigationState] = useState("TODAY");
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push("/Access");
    },
  });
  const {
    data: Expenses,
    error: ExpensesError,
    mutate,
  } = useSWR(session?.user?._id && `/Expense?id=${session.user._id}`, fetcher);
  console.log("Expenses", Expenses);
  const handleClear = async (id) => {
    let data = {
      id,
      userId: session.user._id,
    };
    await deleteExpenseObject(data);
    await mutate();
    toast.success("Deleted!");
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
      {BottomNavigationState === "TODAY" && (
        <Today Expenses={Expenses?.data} handleClear={handleClear} />
      )}

      {BottomNavigationState === "ALL" && <All Expenses={Expenses?.data} />}
      {BottomNavigationState === "ADD" && (
        <Add mutate={mutate} Expenses={Expenses?.data} />
      )}

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
