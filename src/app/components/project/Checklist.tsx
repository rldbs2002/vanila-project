"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Pagination,
  Select,
  MenuItem,
  styled,
  InputBase,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import Link from "next/link";
import { StyledTableCell, StyledTableRow } from "../StyledComponents";
import { statusNames } from "@/utils/constants";
import Card1 from "../Card1";
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

const Checklist = ({ data }: any) => {
  console.log(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchField, setSearchField] = useState("cartID");
  const [searchValue, setSearchValue] = useState("");
  const [alignment, setAlignment] = useState("process");

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);

    // Reset search and current page when changing the alignment
    setSearchValue("");
    setCurrentPage(1);
  };

  // Use useEffect to re-render when alignment changes
  useEffect(() => {
    // Update the current page items based on the new alignment
    setCurrentPageItems(getCurrentPageItems());
  }, [alignment]);

  const numPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  const getCurrentPageItems = () => {
    const cartIds = Object.keys(data);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cartIds
      .sort((a, b) => b.localeCompare(a)) // Sort cartIds in reverse order
      .slice(startIndex, endIndex);
  };

  const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearchFieldChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchField(value);
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filteredItems = Object.keys(data).filter((cartId) => {
      const cartData = data[cartId][0];
      const status = cartData.status;

      if (status >= 4) {
        if (
          searchField.toLowerCase() === "cartID" && // 변경: "cartID"를 "cart_id"로 수정
          cartData.cart_id.toLowerCase().includes(value)
        ) {
          return true;
        } else if (
          // "status" 삭제
          searchField.toLowerCase() === "options" &&
          cartData.cartOptions.toLowerCase().includes(value)
        ) {
          return true;
        }
      }
      return false;
    });

    // 현재 페이지를 첫 번째 페이지로 설정하고 필터된 결과를 업데이트합니다.
    setCurrentPage(1);
    setCurrentPageItems(filteredItems);
  };

  const [currentPageItems, setCurrentPageItems] = useState(
    getCurrentPageItems()
  );

  useEffect(() => {
    // Update the current page items when data or currentPage changes
    setCurrentPageItems(getCurrentPageItems());
  }, [data, currentPage]);

  return (
    <Box py={4}>
      <Card1 sx={{ mb: 4 }}>
        <Paragraph
          style={{
            margin: "2rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Checkout
        </Paragraph>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Select
              value={searchField.toLowerCase()} // 소문자로 설정
              variant="outlined"
              onChange={(event: any) => handleSearchFieldChange(event)}
              sx={{
                height: 44,
                fontSize: 14,
                width: "100%",
                maxWidth: 100,
                fontWeight: 500,
                borderRadius: "8px",
                margin: "1rem",
              }}
            >
              <MenuItem value="cartid">Cart ID</MenuItem>
              <MenuItem value="options">Options</MenuItem>
            </Select>

            <StyledInputBase
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchValueChange}
              style={{ width: "250px", marginRight: "1rem" }}
            />

            {/* ToggleButtonGroup으로 process과 complete 버튼을 표시합니다. */}
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignmentChange}
              aria-label="Show Items"
              sx={{ margin: "1rem", marginLeft: "auto" }}
            >
              <ToggleButton value="process">process</ToggleButton>
              <ToggleButton value="complete">complete</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <Table>
            <TableHead sx={{ backgroundColor: "grey.200" }}>
              <TableRow>
                <StyledTableCell>Cart ID</StyledTableCell>
                <StyledTableCell>Options</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageItems.map((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                const cart_id = cartData.cart_id;

                // Check the alignment value and show items accordingly
                if (
                  (!alignment && cartData.status >= 5) ||
                  (alignment === "complete" && status > 6) ||
                  (alignment === "process" && (status === 5 || status === 6))
                ) {
                  return (
                    <StyledTableRow key={cartId}>
                      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                        <Link href={`/checkout/${cartId}`}>{cart_id}</Link>
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                        {cartData.cartOptions}
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                        {statusNames[status]}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
                return null; // Don't render if conditions are not met
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            margin: "1rem",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={numPages}
            page={currentPage}
            color="primary"
            onChange={handlePageClick}
          />
        </Stack>
      </Card1>
    </Box>
  );
};

export default Checklist;
