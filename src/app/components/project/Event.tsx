"use client";

import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import Card1 from "../Card1";
import { H2 } from "../Typography";
import Image from "next/image";

const Event = () => {
  return (
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
              event
            </H2>
          </Container>
        </Box>
        <Container sx={{ my: "5rem", maxWidth: "80%", mx: "auto" }}>
          <Card1>
            <Typography
              sx={{
                fontSize: "2rem",
                textAlign: "center",
                fontWeight: 700,
                color: "secondary.main",
                mb: 5,
                textTransform: "uppercase",
              }}
            >
              Celebrate Christmas with KGOODS! 🎁
            </Typography>
            <Box display="flex" justifyContent="center" my={4}>
              <Image
                src="/assets/images/event.PNG"
                width={850}
                height={250}
                alt="event"
              />
            </Box>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              This is the season for giving, and we’re spreading the joy at
              KGOODS! <br></br>Join our Christmas event and have the chance to
              win 15% Discount Coupont for FREE!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              <strong>Event Dates:</strong> December 8th, 2023 – January 25th,
              2024
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.3rem" }}>
              Happy holidays!
            </Typography>
          </Card1>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Event;
