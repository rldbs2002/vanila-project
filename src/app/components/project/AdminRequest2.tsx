"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  InputBase,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Radio,
  Card,
} from "@mui/material";
import Link from "next/link";
import { StyledTableCell } from "../StyledComponents";
import { useRouter } from "next/navigation";
import { statusNames } from "@/utils/constants";
import { Paragraph } from "../Typography";
import { getRequestsData } from "@/app/lib/data";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 44,
  fontSize: 14,
  width: "100%",
  maxWidth: 350,
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.down("sm")]: { maxWidth: "100%" },
  "::placeholder": { color: theme.palette.text.disabled },
}));

const AdminRequest2 = ({ requestData }: any) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("userId");
  const [filterStatus, setFilterStatus] = useState("1"); // Default: Show Not Arrived

  console.log(requestData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getRequestsData();

  //       setRequestData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Handler for status radio button
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value);
  };

  // Filter function based on search criteria and status
  const filteredData = Array.isArray(requestData)
    ? requestData.filter((item: any) => {
        // Case-insensitive search by user ID or email
        const searchTermLowerCase = searchTerm.toLowerCase();
        const userFieldToSearch =
          searchCriteria === "userId" ? item.user : item.userEmail;
        const isMatchingUser = userFieldToSearch
          .toLowerCase()
          .includes(searchTermLowerCase);

        // Filter by status
        const isMatchingStatus =
          filterStatus === "all" || item.status.toString() === filterStatus;

        return isMatchingUser && isMatchingStatus;
      })
    : [];

  return (
    <>
      <Paragraph
        style={{
          fontSize: "1.7rem",
          margin: "2rem",
          fontWeight: "bold",
        }}
      >
        Admin Requests
      </Paragraph>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StyledInputBase
          placeholder={`Search by ${
            searchCriteria === "userId" ? "User ID" : "Email"
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "250px",
            margin: "1rem",
          }}
        />

        {/* Status filters */}
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <Radio
              value="1"
              checked={filterStatus === "1"}
              onChange={handleStatusChange}
            />
            <label>Not Arrived</label>
          </div>
          <div style={{ marginRight: "10px" }}>
            <Radio
              value="2"
              checked={filterStatus === "2"}
              onChange={handleStatusChange}
            />
            <label>Arrived</label>
          </div>
          <div>
            <Radio
              value="all"
              checked={filterStatus === "all"}
              onChange={handleStatusChange}
            />
            <label>All</label>
          </div>
        </div>
      </div>

      <Card sx={{ mb: 4 }}>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "grey.200" }}>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>Request ID</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredData) &&
                filteredData.map((item: any) => (
                  <TableRow key={item._id}>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      {item.user}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      <Link href={`/requests/${item._id}`}>
                        {item.request_id}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      {statusNames[item.status]}
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default AdminRequest2;
