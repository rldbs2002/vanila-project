"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, Container, styled } from "@mui/material";
import BazaarCard from "../components/BazaarCard";
import { H1, Paragraph } from "../components/Typography";
import ShopLayout2 from "../components/ShopLayout2";

// custom styled components
const Wrapper = styled(BazaarCard)({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  marginTop: "2rem",
  padding: "11px 24px",
});

const OrderConfirmation = () => {
  return (
    <ShopLayout2>
      <Container sx={{ mt: 4, mb: 20 }}>
        <Wrapper>
          <Image
            width={116}
            height={116}
            alt="complete"
            src="/assets/images/party-popper.svg"
          />
          <H1 lineHeight={1.1} mt="1.5rem">
            Your Request is completed!
          </H1>

          <Paragraph color="grey.800" mt="0.3rem">
            You will be receiving confirmation email with order details.
          </Paragraph>

          <StyledButton
            color="primary"
            disableElevation
            variant="contained"
            className="button-link"
            LinkComponent={Link}
            href="/newrequest"
            style={{ marginRight: "2.5rem" }}
          >
            New Request
          </StyledButton>

          <StyledButton
            color="primary"
            disableElevation
            variant="contained"
            className="button-link"
            LinkComponent={Link}
            href="/requests"
            style={{ marginLeft: "2.5rem" }}
          >
            Requests
          </StyledButton>
        </Wrapper>
      </Container>
    </ShopLayout2>
  );
};

export default OrderConfirmation;
