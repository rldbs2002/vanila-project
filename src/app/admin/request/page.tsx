import ShopLayout2 from "@/app/components/ShopLayout2";
import React from "react";
import { Container } from "@mui/material";
import AdminRequest2 from "@/app/components/project/AdminRequest2";
import { getRequestsData } from "@/app/lib/data";

const AdminRequestPage = async () => {
  const data = await getRequestsData();

  return (
    <ShopLayout2>
      <Container
        sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto", minHeight: "520px" }}
      >
        <AdminRequest2 requestData={data} />
      </Container>
    </ShopLayout2>
  );
};

export default AdminRequestPage;
