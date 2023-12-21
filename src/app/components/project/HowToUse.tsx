import React, { FC } from "react";
import { Box, Container, Avatar, Typography, Grid } from "@mui/material";
import { FlexBox } from "../flex-box";
import Card1 from "../Card1";
import { Paragraph, H2 } from "../Typography";

type HeadingProps = { number: number; title: string };

const Heading: FC<HeadingProps> = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="2rem" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </FlexBox>
  );
};

const HowToUse = () => {
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
              how to use
            </H2>
          </Container>
        </Box>

        <Container sx={{ my: "5rem", maxWidth: "80%", mx: "auto" }}>
          <Card1 sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
                fontWeight: 700,
                color: "secondary.main",
                mb: 5,
                textTransform: "uppercase",
              }}
            >
              Use kgoods to purchase goods from Korea. <br></br> Receive them
              safely and quickly to your address.
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f8f8f8",
                p: 2,
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <Heading number={1} title="Purchase items" />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                When you purchase an item from another site, enter the address
                below to receive the item.
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                -English Address: 14, Yongso-ro, Nam-gu, Busan, Republic of
                Korea
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                -Korean Address: 부산광역시 남구 용소로 14
              </Paragraph>
              <Heading number={2} title="Sign up for Kgoods membership" />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                Create a new account to use Kgoods.
              </Paragraph>

              <Heading number={3} title="Please fill out the NewRequest" />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                Sign in to Kgoods and fill out a request for the purchased item
                first. The key information you need to enter when creating the
                request is as follows.
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - Tracking Number
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - Carrier Company
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - Product Name
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                - Product URL
              </Paragraph>

              <Heading
                number={4}
                title="Please check if the item has arrived"
              />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                Please check the arrival of the Request item you wrote When the
                request item arrives at our company, a picture will be attached.
              </Paragraph>

              <Heading number={5} title="Add the Request item to Cart" />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                Select a service such as shipping, Repacking, and solidate for
                the Request item that arrived, and then add the item to Cart.
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - Shipping: Re-delivering the product as it arrived
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - Repackaging: repackaging a single item
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                - Consolidate: repackaging multiple items into one
              </Paragraph>

              <Heading number={6} title="Check the price on Cart list" />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                We offer prices for the service you choose, depending on the
                volume and weight of the item and the country you want to
                receive it from. After checking the price, check out for
                payment.
              </Paragraph>

              <Heading
                number={7}
                title="Check out the delivery progress on the Checkout list"
              />
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={5}>
                You can check the progress of the checked out item in the
                following steps.
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - We upload the photos of the packaged items before delivery for
                the checked out items
              </Paragraph>
              <Paragraph fontSize="1.2rem" fontWeight={300} mb={1}>
                - You can check the invoice number with the delivery company
              </Paragraph>
            </Box>
          </Card1>
        </Container>
      </Grid>
    </Grid>
  );
};

export default HowToUse;
