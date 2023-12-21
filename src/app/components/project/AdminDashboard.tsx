"use client";

import React, { useEffect, useState } from "react";
import { Divider, Avatar, Typography, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  getCompleteCartData,
  getCompleteCheckoutData,
  getCompleteRequestData,
  getDailyCartData,
  getDailyCheckoutData,
  getDailyRequestData,
  getRemainCartsData,
  getRemainCheckoutsData,
  getRemainRequestsData,
} from "@/app/lib/data";
import Link from "next/link";
import { Paragraph } from "../Typography";

const AdminDashboard = () => {
  const [remainRequestsData, setRemainRequestsData] = useState([]);

  const [remainCartsData, setRemainCartsData] = useState([]);

  const [remainCheckoutsData, setRemainCheckoutsData] = useState([]);

  const [dailyRequestData, setDailyRequestData] = useState([]);

  const [dailyCartData, setDailyCartData] = useState([]);

  const [dailyCheckoutData, setDailyCheckoutData] = useState([]);

  const [completeRequestData, setCompleteRequestData] = useState([]);

  const [completeCartData, setCompleteCartData] = useState([]);

  const [completeCheckoutData, setCompleteCheckoutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRemainRequestsData();

        setRemainRequestsData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRemainCartsData();

        setRemainCartsData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRemainCheckoutsData();

        setRemainCheckoutsData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyRequestData();

        setDailyRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyCartData();

        setDailyCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyCheckoutData();

        setDailyCheckoutData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompleteRequestData();

        setCompleteRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompleteCartData();

        setCompleteCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompleteCheckoutData();

        setCompleteCheckoutData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const barChartData = [
    { name: "Request", value: dailyRequestData.length, color: "#4BB4B4" },
    {
      name: "Carts",
      value: dailyCartData.length,
      color: "rgb(51, 208, 103)",
    },
    { name: "Checkout", value: dailyCheckoutData.length, color: "#BE7374" },
  ];

  const completedData = [
    {
      name: "Request",
      value: completeRequestData.length,
      color: "#4BB4B4",
    },
    {
      name: "Carts",
      value: completeCartData.length,
      color: "rgb(51, 208, 103)",
    },
    {
      name: "Checkout",
      value: completeCheckoutData.length,
      color: "#BE7374",
    },
  ];

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // 수평 중앙 정렬
              textAlign: "center",
            }}
          >
            <Paragraph
              style={{
                fontSize: "1.7rem",
                marginBottom: "6rem",
                fontWeight: "bold",
              }}
            >
              Work To Do
            </Paragraph>
            <>
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
                <Link href="/admin/request">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      color: "primary.text",
                      backgroundColor: "paste.main",
                    }}
                  >
                    {remainRequestsData.length}
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
                <Link href="/admin/cart">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      color: "primary.text",
                      backgroundColor: "success.main",
                    }}
                  >
                    {remainCartsData.length}
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
                <Link href="/admin/checkout">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      color: "secondary.text",
                      backgroundColor: "marron.main",
                    }}
                  >
                    {remainCheckoutsData.length}
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
            </>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paragraph
            style={{
              fontSize: "1.7rem",
              marginBottom: "2rem",
              marginLeft: "7rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Daily Status ({formattedDate})
          </Paragraph>

          {/* Bar Chart */}
          <div style={{ marginBottom: "4rem" }}>
            <Paragraph
              style={{
                fontSize: "1.4rem",
                marginBottom: "2rem",
                marginLeft: "7rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              New
            </Paragraph>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barChartData} layout="vertical">
                <CartesianGrid opacity={0} />
                <XAxis type="number" domain={[0, 20]} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 20 }}
                  width={170}
                  tickLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  label={{ fontSize: 14, position: "insideTop" }}
                  barSize={20}
                >
                  {/* Display value as percentage based on the 100 units */}
                  {barChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={(entry.value / barChartData.length) * 100}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Completed */}
          <div>
            <Paragraph
              style={{
                fontSize: "1.4rem",
                marginBottom: "2rem",
                marginLeft: "7rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Complete
            </Paragraph>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={completedData} layout="vertical">
                <CartesianGrid opacity={0} />
                <XAxis type="number" domain={[0, 20]} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 20 }}
                  width={170}
                  height={20}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  label={{ fontSize: 20, position: "insideTop" }}
                  barSize={20}
                >
                  {completedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={(entry.value / completedData.length) * 100}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
