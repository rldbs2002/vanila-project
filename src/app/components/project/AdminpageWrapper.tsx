"use client";

import React from "react";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { Paragraph } from "../Typography";
import AdminDashboard from "./AdminDashboard";

const AdminpageWrapper = () => {
  const { data: session } = useSession();
  console.log(session);
  const lastLoginDate = session?.expires ? new Date(session.expires) : null;
  if (lastLoginDate) {
    lastLoginDate.setDate(lastLoginDate.getDate() - 1);
  }

  return (
    <>
      <AdminDashboard />
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

export default AdminpageWrapper;
