"use client";

import { FC, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { statusNames } from "@/utils/constants";

type RequestsRowProps = {
  handleCheckboxChange: (itemId: string) => void;
  isSelected: boolean;
  data: any;
};

const RequestsRow: FC<RequestsRowProps> = ({
  data,
  handleCheckboxChange,
  isSelected,
}) => {
  const { _id, status, request_id } = data;
  const product_list = data.request_info.product_list;
  const maxCharacters = 20;
  let product_name = "";

  for (const product of product_list) {
    const truncatedName = product.name.slice(0, maxCharacters);
    if (product_name.length + truncatedName.length <= maxCharacters) {
      if (product_name.length > 0) {
        product_name += ", ";
      }
      product_name += truncatedName;
    } else {
      break;
    }
  }

  const product_price = data.request_info.product_list.reduce(
    (total: number, product: any) => total + product.totalValueUSD,
    0
  );

  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCellClick = (itemId: string) => {
    router.push(`/requests/${itemId}`);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    fetch(`/api/request/${_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setIsDeleted(true);
        } else {
          console.error("요청 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("요청 삭제 중 오류 발생: ", error);
      })
      .finally(() => {
        setDialogOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setDialogOpen(false);
  };

  return isDeleted ? null : (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isSelected}>
      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        <Checkbox
          checked={isSelected}
          onChange={() => handleCheckboxChange(_id)}
        />
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{ fontWeight: 400, cursor: "pointer" }}
        onClick={() => handleCellClick(_id)}
      >
        #{request_id}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        {product_name || "No Data"}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        $ {product_price}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
        <StatusWrapper status={status}>{statusNames[status]}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <StyledIconButton>
          <Edit onClick={() => handleCellClick(_id)} />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={handleDeleteClick} />
        </StyledIconButton>

        <Dialog
          open={isDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RequestsRow;
