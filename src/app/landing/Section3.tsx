"use client";

import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { Box, Button, Container, Grid, styled } from "@mui/material";
import { FlexRowCenter } from "../components/flex-box";
import { H2, H4, Paragraph, Span } from "../components/Typography";
import PageCard from "./PageCard";

const FilterButton = styled(Button)<{ selected: number }>(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.primary.main : "inherit",
    ":hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
    },
  })
);

const TitleBadge = styled(Span)(({ theme }) => ({
  color: theme.palette.grey[500],
  margin: "0 4px",
}));

// ==================================================================
type Props = {
  filterDemo: string;
  setFilterDemo: Dispatch<SetStateAction<string>>;
};
// ==================================================================

const Section3: FC<Props> = ({ filterDemo, setFilterDemo }) => {
  const pages = [...demoPageList];
  const filtered = pages.filter((item) =>
    filterDemo !== "" ? item.page === filterDemo : true
  );

  return (
    <Box
      mb={14}
      id="demos"
      sx={{
        background:
          "url(/assets/images/landing/landing-bg-2.svg) center/contain no-repeat",
      }}
    >
      <Container id="section-3" sx={{ position: "relative" }}>
        <Box maxWidth="830px" mx="auto" mb="2.5rem" textAlign="center">
          <H4 color="primary.main" fontSize="58px" fontWeight="700">
            BLOGS
          </H4>

          <Paragraph color="primary.main" fontSize="18px">
            Server side rendered
          </Paragraph>

          <H2
            mb={4}
            fontSize={28}
            fontWeight="700"
            textAlign="center"
            color="secondary.main"
            textTransform="uppercase"
          >
            Demos & Pages
          </H2>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}></Grid>

          {filtered.map((item, i) => (
            <Grid item lg={4} sm={6} xs={12} key={i}>
              <PageCard
                {...item}
                imgUrl={item.imgUrl}
                previewUrl={item.previewUrl}
                title={item.title}
              />
            </Grid>
          ))}
        </Grid>

        <FlexRowCenter mt={6}>
          <Button
            color="primary"
            variant="contained"
            LinkComponent={Link}
            href="https://tinyurl.com/get-bazaar"
          >
            Purchase Now
          </Button>
        </FlexRowCenter>
      </Container>
    </Box>
  );
};

const demoPageList = [
  {
    imgUrl: "/assets/images/landing/home/super-store.jpg",
    previewUrl: "/market-1",
    title: <>가장 빠른 배송</>,
    page: "homepage",
    desc: "가장 빠른 배송",
  },
  {
    imgUrl: "/assets/images/landing/home/market-2.jpg",
    previewUrl: "/market-2",
    title: <>가장 빠른 배송</>,
    page: "homepage",
    status: "New",
    desc: "가장 빠른 배송",
  },
  {
    imgUrl: "/assets/images/landing/home/fashion-2.jpg",
    previewUrl: "/fashion-shop-2",
    title: <>가장 빠른 배송</>,
    page: "homepage",
    status: "New",
    desc: "가장 빠른 배송",
  },
];

export default Section3;
