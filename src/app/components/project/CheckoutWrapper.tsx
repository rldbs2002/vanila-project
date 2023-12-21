"use client";

import React from "react";
import { Container } from "@mui/material";
import CartForm from "./CartForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const CheckoutWrapper = ({ data }: any) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  const keys = Object.keys(data);
  const firstKey = keys[0];

  return (
    <Container sx={{ my: "1.5rem" }}>
      <CartForm data={data} />
    </Container>
  );
};

export default CheckoutWrapper;
