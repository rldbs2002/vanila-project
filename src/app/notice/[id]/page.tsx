import ShopLayout2 from "@/app/components/ShopLayout2";
import { Container, Grid, Box } from "@mui/material";
import { H2 } from "@/app/components/Typography";
import Card1 from "@/app/components/Card1";
import React from "react";
import { getNoticeData } from "@/app/lib/data";
import NoticeContents from "@/app/components/project/NoticeContents";

const NoticeIdPage = async ({ params }: any) => {
  const data = await getNoticeData(params.id);

  return (
    <ShopLayout2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: "grey.100" }}>
            <Container sx={{ py: 6, maxWidth: "80%" }}>
              <H2
                fontSize={36}
                textAlign="center"
                fontWeight="700"
                color="secondary.main"
                mb={5}
                textTransform="uppercase"
              >
                notice
              </H2>
            </Container>
          </Box>
          <Container sx={{ my: "1.5rem" }}>
            <Card1>
              <NoticeContents data={data} />
            </Card1>
          </Container>
        </Grid>
      </Grid>
    </ShopLayout2>
  );
};

export default NoticeIdPage;
