import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import API from "../../baseUrl";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({ showEdit: false, rowIndex: null });
  const [deleteDialog, setDeleteDialog] = useState({
    showDelete: false,
    rowIndex: null,
  });
  const [open, setOpen] = useState(true);

  const columns = [
    "Order Id",
    "Customer Name",
    "Customer Email",
    "Address",
    "Status",
    "Action",
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEdit({ showEdit: true, rowIndex: index });
    setOpen(true);
  };

  const handleDelete = (index) => {
    setDeleteDialog({ showDelete: true, rowIndex: index });
  };

  const handleSave = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteDialog({ showDelete: false, rowIndex: null });
  };

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data } = await API.get("order/getAllOrders");
      return data.data;
    };
    fetchOrders().then((response) => {
      setOrders(response);
      setLoading(false);
    });
  }, []);

  return (
    <Container style={{ textAlign: "center" }}>
      <TableContainer style={{ overflowX: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((eachColumn) => {
                return (
                  <TableCell
                    align={eachColumn === "Order Id" ? "center" : "center"}
                    key={eachColumn}
                  >
                    {eachColumn}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LinearProgress />
            ) : (
              orders
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((order, index) => (
                  <TableRow>
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">{order.CustomerName}</TableCell>
                    <TableCell align="center">{order.CustomerEmail}</TableCell>
                    <TableCell align="center">{order.AddressId}</TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">
                      <span
                        className="material-icons"
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => handleEdit(index)}
                      >
                        edit
                      </span>
                      <span
                        className="material-icons"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(index)}
                      >
                        delete
                      </span>
                      {/* {edit.showEdit && edit.rowIndex === index && (
                        <BookEdit
                          handleClose={handleClose}
                          open={open}
                          handleSave={handleSave}
                        />
                      )}
                      {deleteDialog.showDelete &&
                        deleteDialog.rowIndex === index && (
                          <DeleteModal
                            open={deleteDialog.showDelete}
                            handleDeleteClose={handleDeleteClose}
                            book={book}
                          />
                        )} */}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        count={parseInt((orders?.length / 10).toFixed(0))}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
}
