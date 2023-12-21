"use client";

import { Avatar, Box, Container, Button, Grid } from "@mui/material";
import { FlexBox } from "../components/flex-box";
import { H2, H4, Paragraph } from "../components/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";

const BlogUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const list = [
  {
    title: "BTS' Jungkook to release 1st solo album 'Golden'",
    thumbnail: "/assets/images/BTS.jpg",
    subTitle:
      "Jungkook of K-pop juggernaut BTS will put out his first solo album 'Golden'",
    category: "homepage",
    buttonText: "Browse Demos",
    date: "2023-11-28",
    link: `${BlogUrl}/blog/post-01`,
  },
  {
    title: "NewJeans to perform at Billboard Music Awards",
    thumbnail: "/assets/images/NewJeans.jpg",
    subTitle:
      "NewJeans will be the first K-pop girl group to perform at the Billboard Music Awards",
    category: "shop",
    buttonText: "Browse Pages",
    date: "2023-11-28",
    link: `${BlogUrl}/blog/post-02`,
  },
  {
    title: "OVERWATCH2 & LE SSERAFIM NEW COLLAB EVENT!",
    thumbnail: "/assets/images/Overwatch.png",
    subTitle:
      "Overwatch 2's first-ever in-game musical artist collaboration with K-pop sensation, LE SSERAFIM.",
    category: "user",
    buttonText: "Browse User Dashboard",
    date: "2023-11-28",
    link: `${BlogUrl}/blog/post-03`,
  },
  {
    title: "BTS Members Are Joining The Military",
    thumbnail: "/assets/images/BTS-military.png",
    subTitle: "The biggest boy band in the world is joining the military.",
    category: "admin",
    buttonText: "Browse Admin Dashboard",
    date: "2023-11-28",
    link: `${BlogUrl}/blog/post-04`,
  },
];

const Section8 = () => {
  return (
    <Box
      mb={8}
      id="demos"
      sx={{
        background:
          "url(/assets/images/landing/landing-bg-2.svg) center/contain no-repeat",
      }}
    >
      <Container
        id="section-3"
        sx={{ position: "relative", maxWidth: "80%", mx: "auto" }}
      >
        <Box
          maxWidth="830px"
          mx="auto"
          mb="2.5rem"
          textAlign="center"
          mt="2.5rem"
        >
          <H4 color="primary.main" fontSize="45px" fontWeight="700">
            BLOGS
          </H4>

          <H2
            mb={4}
            fontSize={20}
            fontWeight="700"
            textAlign="center"
            color="secondary.main"
            textTransform="uppercase"
          >
            Spotlights & Topics
          </H2>
        </Box>

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
                    boxShadow: 1,
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Link href={item.link}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={240}
                      height={140}
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                </Box>

                <Link href={item.link}>
                  <H2 fontSize={18} mb={1} textAlign="center">
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
                    {item.date}
                  </Paragraph>
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
                </Link>
              </FlexBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section8;
