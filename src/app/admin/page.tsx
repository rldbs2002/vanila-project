import React from "react";
import ShopLayout2 from "../components/ShopLayout2";
import { Container } from "@mui/material";
import AdminpageWrapper from "../components/project/AdminpageWrapper";

const AdminPage = () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <AdminpageWrapper />
      </Container>
    </ShopLayout2>
  );
};

export default AdminPage;
