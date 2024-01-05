"use client";

import React, { useState } from "react";
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
  Card,
  Radio,
} from "@mui/material";
import Link from "next/link";
import { StyledTableCell } from "../StyledComponents";
import { useRouter } from "next/navigation";
import { statusNames } from "@/utils/constants";
import { Paragraph } from "../Typography";

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

const AdminCart = ({ data }: any) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("userId");
  const [filterStatus, setFilterStatus] = useState("3");

  console.log(data);

  // Filter function based on search criteria and status
  const filteredData = data.filter((item: any) => {
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
  });

  // Handler for status radio button
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value);
  };

  return (
    <>
      <Paragraph
        style={{
          fontSize: "1.7rem",
          margin: "2rem",
          fontWeight: "bold",
        }}
      >
        Admin Cart
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
              value="3"
              checked={filterStatus === "3"}
              onChange={handleStatusChange}
            />
            <label>Not Calculated</label>
          </div>
          <div style={{ marginRight: "10px" }}>
            <Radio
              value="4"
              checked={filterStatus === "4"}
              onChange={handleStatusChange}
            />
            <label>Calculated</label>
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
                <StyledTableCell>Cart ID</StyledTableCell>
                <StyledTableCell>Options</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item: any) => (
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
                    <Link href={`/cart/${item._id}`}>{item.cart_id}</Link>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ fontWeight: 400, cursor: "pointer" }}
                  >
                    {item.options}
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

export default AdminCart;
