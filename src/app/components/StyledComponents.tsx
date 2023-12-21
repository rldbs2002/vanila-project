"use client";

import { Clear } from "@mui/icons-material";
import {
  alpha,
  Box,
  IconButton,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";

// styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 600,
  paddingBottom: 10,
  color: theme.palette.grey[900],
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

const CategoryWrapper = styled(Box)(({ theme }) => ({
  fontSize: 13,
  padding: "3px 12px",
  borderRadius: "16px",
  display: "inline-block",
  color: theme.palette.grey[900],
  backgroundColor: theme.palette.grey[200],
}));

const StyledTableRow = styled(TableRow)({
  ":last-child .MuiTableCell-root": { border: 0 },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    ":hover": { backgroundColor: "transparent" },
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  "& .MuiSvgIcon-root": { fontSize: 19 },
  ":hover": { color: theme.palette.info.main },
}));

type StatusType = {
  status:
    | "Accepted"
    | "Rejected"
    | "Processing"
    | "Pending"
    | "Delivered"
    | "Normal"
    | "Urgent"
    | "Cancelled";
};

const StatusWrapper = styled(Box)<StatusType>(({ theme, status }) => {
  let color = theme.palette.secondary.main;

  if (status === "Accepted" || status === "Delivered" || status === "Normal") {
    color = theme.palette.success.main;
  }

  if (status === "Rejected" || status === "Urgent" || status === "Cancelled") {
    color = theme.palette.error.main;
  }

  if (status === "Processing") {
    color = theme.palette.warning.main;
  }

  if (status === "Pending") {
    color = theme.palette.info.main;
  }

  return {
    color,
    fontSize: 12,
    fontWeight: 600,
    borderRadius: "8px",
    padding: "3px 12px",
    display: "inline-flex",
  };
});

const UploadImageBox = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.info.light, 0.1),
}));

const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  cursor: "pointer",
  position: "absolute",
});

export {
  CategoryWrapper,
  StyledIconButton,
  StyledTableRow,
  StyledTableCell,
  StatusWrapper,
  UploadImageBox,
  StyledClear,
};
