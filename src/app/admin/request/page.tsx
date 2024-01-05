import ShopLayout2 from "@/app/components/ShopLayout2";
import React from "react";
import { Container } from "@mui/material";
import AdminRequest2 from "@/app/components/project/AdminRequest2";
import { getRequestsData } from "@/app/lib/data";

// This function can be named anything
// async function getProjects() {
//   const res = await fetch(`http://localhost:3000/api/requests`, {
//     cache: "no-store",
//   });
//   const projects = await res.json();

//   return projects;
// }

const AdminRequestPage = async () => {
  // const data = await getRequestsData();

  // const projects = await getProjects();
  return (
    <ShopLayout2>
      <Container
        sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto", minHeight: "520px" }}
      >
        <AdminRequest2 /* requestData={projects} */ />
      </Container>
    </ShopLayout2>
  );
};

export default AdminRequestPage;
