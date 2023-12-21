"use client";

import { Box, Container, Grid } from "@mui/material";
import { FlexBox } from "../components/flex-box";
import { H2, Paragraph } from "../components/Typography";
import Image from "next/image";

const BenefitsUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const list = [
  {
    title: "Reduce shipping costs",
    thumbnail: "/assets/images/reduce.png",
    subTitle:
      "Use Kgoods to dramatically reduce shipping costs With Repacking, Consolidate service, you can reduce your shipping cost.",
    category: "homepage",
    buttonText: "Browse Demos",
    link: `${BenefitsUrl}/benefits/post-01`,
  },
  {
    title: "Safe and Fast delivery",
    thumbnail: "/assets/images/courier.png",
    subTitle:
      "Where you want the items you purchased To ensure that you receive it safely and quickly, Kgoods provides a reliable service.",
    category: "shop",
    buttonText: "Browse Pages",
    link: `${BenefitsUrl}/benefits/post-02`,
  },
  {
    title: "customer satisfaction",
    thumbnail: "/assets/images/top-service.png",
    subTitle:
      "Kgoods Always strives to continue communicating with you in a variety of smooth ways to provide satisfactory service.",
    category: "user",
    buttonText: "Browse User Dashboard",
    link: `${BenefitsUrl}/benefits/post-03`,
  },
  {
    title: "The Best Service",
    thumbnail: "/assets/images/box.png",
    subTitle:
      "We will promptly inform you of the detailed progress of all procedures until you purchase and receive the goods.",
    category: "admin",
    buttonText: "Browse Admin Dashboard",
    link: `${BenefitsUrl}/benefits/post-04`,
  },
];

const Section6 = () => {
  return (
    <Box id="get" sx={{ backgroundColor: "grey.100" }}>
      <Container sx={{ py: 9, maxWidth: "80%" }}>
        <H2
          fontSize={32}
          textAlign="center"
          fontWeight="700"
          color="secondary.main"
          mb={8}
          textTransform="uppercase"
        >
          What are the benefits?
        </H2>

        <Grid container spacing={6}>
          {list.map((item, index) => (
            <Grid item lg={3} md={6} xs={12} key={index}>
              <FlexBox
                gap={1}
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: { xs: "100%" },
                  margin: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: "100",
                    width: "100",
                    mb: 1,
                  }}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={150}
                    height={100}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <H2 fontSize={22} mb={1} textAlign="center">
                  {item.title}
                </H2>
                <Paragraph
                  mb={2}
                  textAlign="center"
                  sx={{
                    letterSpacing: "0.1em",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {item.subTitle}
                </Paragraph>
              </FlexBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section6;
