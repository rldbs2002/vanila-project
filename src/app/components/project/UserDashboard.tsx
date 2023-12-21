"use client";

import React, { useEffect, useState } from "react";
import { Paragraph } from "../Typography";
import { Divider, Avatar, Typography } from "@mui/material";
import {
  getMyCartsData,
  getMyCheckoutData,
  getMyRequestData,
} from "@/app/lib/data";
import Link from "next/link";

const UserDashboard = () => {
  const [requestData, setRequestData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyCartsData();

        setCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyRequestData();

        setRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyCheckoutData();

        setCheckoutData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 수평 중앙 정렬
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          <Paragraph
            style={{
              fontSize: "1.7rem",
            }}
          >
            Requests
          </Paragraph>
          <Link href="/requests">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                color: "primary.text",
                backgroundColor: "paste.main",
              }}
            >
              {requestData.length}
            </Avatar>
          </Link>
        </div>
        <Divider
          sx={{
            mb: 5,
            borderColor: "paste.400",
            borderBottomWidth: "5px",
            width: "75%",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          <Paragraph
            style={{
              fontSize: "1.7rem",
            }}
          >
            Carts
          </Paragraph>
          <Link href="/cart">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                color: "primary.text",
                backgroundColor: "success.main",
              }}
            >
              {cartData.length}
            </Avatar>
          </Link>
        </div>
        <Divider
          sx={{
            mb: 5,
            borderColor: "success.400",
            borderBottomWidth: "5px",
            width: "75%",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          <Paragraph
            style={{
              fontSize: "1.7rem",
            }}
          >
            Checkout
          </Paragraph>
          <Link href="/checkout">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                color: "secondary.text",
                backgroundColor: "marron.main",
              }}
            >
              {checkoutData.length}
            </Avatar>
          </Link>
        </div>
        <Divider
          sx={{
            mb: 3,
            borderColor: "marron.400",
            borderBottomWidth: "5px",
            width: "75%",
          }}
        />
      </div>
    </>
  );
};

export default UserDashboard;
