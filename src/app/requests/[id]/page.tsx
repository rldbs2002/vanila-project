import React from "react";
import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/ShopLayout2";
import { NextPage } from "next";
import { getRequestData } from "@/app/lib/data";
import RequestsOne from "@/app/components/project/RequestsOne";

const RequestsIdPage: NextPage = async ({ params }: any) => {
  const data = await getRequestData(params.id);

  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RequestsOne data={data} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default RequestsIdPage;
