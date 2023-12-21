"use client";

import React, { useState } from "react";
import { Paragraph } from "../Typography";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const ChangePassword = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  const handleClose = () => {
    setIsPasswordMismatch(false);
  };

  const handleChangePassword = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      if (newPassword !== confirmPassword) {
        setIsPasswordMismatch(true); // Show the modal
        return;
      }

      // Send the password change request to the server
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          email: session?.user.email,
        }),
      });

      if (response.ok) {
        console.log("Password changed successfully!");

        // Sign out the user
        await signOut({ redirect: false }); // Don't redirect immediately

        // Redirect the user to the login page
        router.push("/api/auth/signin?callbackUrl=/");
      } else {
        const data = await response.json();

        if (response.status === 401 && data.error === "IncorrectPassword") {
          // Handle incorrect current password
          setIsPasswordMismatch(true); // Show the modal or another error handling logic
        } else {
          console.error("Failed to change password:", data.message);
          // Additional error handling for other cases
          setIsPasswordMismatch(true); // Show the modal or another error handling logic
        }
      }
    } catch (error: any) {
      console.error("Error changing password:", error.message);
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="change-password-content"
          id="change-password-header"
        >
          <Paragraph style={{ fontSize: "1.7rem" }}>Change Password</Paragraph>
        </AccordionSummary>
        <AccordionDetails
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center the content horizontally
            width: "100%", // Set the width of AccordionDetails
            margin: "auto", // Center the AccordionDetails horizontally
          }}
        >
          <Divider
            sx={{
              mb: 1,
              border: "1px solid primary.400", // Use the border property
            }}
          />
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            onClick={handleChangePassword}
            variant="outlined"
            color="primary"
            style={{ width: "100px", marginTop: "2rem" }}
          >
            Submit
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Password Mismatch Modal */}
      <Dialog open={isPasswordMismatch} onClose={handleClose}>
        <DialogTitle>Password Mismatch</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The new password and confirm password do not match. Please make sure
            they are the same.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePassword;
