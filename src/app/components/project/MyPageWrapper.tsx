"use client";

import React from "react";
import { Grid } from "@mui/material";
import UserDashboard from "./UserDashboard";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import { useSession } from "next-auth/react";
import { Paragraph } from "../Typography";

const MypageWrapper = () => {
  const { data: session } = useSession();
  console.log(session);
  const lastLoginDate = session?.expires ? new Date(session.expires) : null;
  if (lastLoginDate) {
    lastLoginDate.setDate(lastLoginDate.getDate() - 1);
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <UserDashboard />
        </Grid>
        <Grid item sm={6} xs={12}>
          <UserInfo />
          <ChangePassword />
        </Grid>
      </Grid>
      <Paragraph
        style={{
          fontSize: "1rem",
          marginTop: "4rem",
          marginBottom: "4rem",
        }}
      >
        Lastest Loggin Date: {lastLoginDate?.toLocaleString()}
      </Paragraph>
    </>
  );
};

export default MypageWrapper;
