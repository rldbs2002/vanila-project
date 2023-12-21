"use client";

import { Box, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import { FlexBox, FlexRowCenter } from "../components/flex-box";
import { H1, Paragraph, Span } from "../components/Typography";
import Link from "next/link";
import { Circle } from "@mui/icons-material";

const Section1 = () => {
  return (
    <Box bgcolor="white">
      <Container id="section-1" sx={{ position: "relative", maxWidth: "80%" }}>
        <Link href="https://github.com/rldbs2002">
          <Image
            src="/assets/images/github.PNG"
            width={280}
            height={80}
            alt="github"
          />
        </Link>
        <Box maxWidth="830px" mx="auto" mb={8} textAlign="center">
          <H1 fontSize="2.8rem" mb={3}>
            <Span>send your k-culture product</Span>
            <Box color="primary.main" lineHeight={1.2}>
              quickly and safely
            </Box>
          </H1>

          <Paragraph
            fontSize="1.6rem"
            fontWeight={500}
            maxWidth="540px"
            mx="auto"
            mb={5}
          >
            We deliver the K-culture goods you purchased quickly and safely
            anywhere in the world you want.
          </Paragraph>

          <Box mx="auto" textAlign="center" mb="2.3rem">
            {[
              "You buy K-culture goods and we send them to you",
              "We will buy and send you the k-culture goods you need",
              "We will make a bulk purchase of the product you want",
            ].map((text, index) => (
              <FlexBox
                key={index}
                sx={{
                  justifyContent: "flex-start",
                  my: 2,
                  maxWidth: "540px",
                  mx: "auto",
                  paddingLeft: "4rem",
                }}
              >
                <Box sx={{ minWidth: "20px", mr: "0.5rem" }}>
                  <Circle color="primary" sx={{ fontSize: "8px" }} />
                </Box>
                <Box sx={{ textAlign: "left", fontSize: "1rem" }}>{text}</Box>
              </FlexBox>
            ))}
          </Box>

          <FlexBox justifyContent="center" mb={2}>
            <Link href="/howtouse">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ m: "0.5rem" }}
              >
                How To Use
              </Button>
            </Link>
          </FlexBox>
        </Box>
      </Container>
    </Box>
  );
};

export default Section1;
