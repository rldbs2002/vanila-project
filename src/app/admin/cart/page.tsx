import ShopLayout2 from "@/app/components/ShopLayout2";
import AdminCart from "@/app/components/project/AdminCart";
import { getCartsData } from "@/app/lib/data";
import React from "react";
import { Container } from "@mui/material";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getCartsData();
  return (
    <ShopLayout2>
      <Container
        sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto", minHeight: "520px" }}
      >
        <AdminCart data={data} />
      </Container>
    </ShopLayout2>
  );
};

export default page;
