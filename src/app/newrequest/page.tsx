import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/ShopLayout2";
import { NextPage } from "next";
import RequestForm from "../components/project/RequestForm";

const NewRequestPage = () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RequestForm />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default NewRequestPage;
