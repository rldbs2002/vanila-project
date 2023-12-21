"use client";

import { getAllCartData } from "@/app/lib/data";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Checklist from "./Checklist";

const ChecklistWrapper = () => {
  const [cartData, setCartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCartData();

        setCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Checklist data={cartData} />
    </Container>
  );
};

export default ChecklistWrapper;
