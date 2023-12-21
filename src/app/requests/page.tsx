import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/ShopLayout2";
import Requests from "../components/project/Requests";

const RequestsPage = async () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Requests />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default RequestsPage;
