import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./FormattedTable.css";

export default function FormattedTable({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "name", label: "Vehículo", minWidth: 170, align: "center" },
    { id: "description", label: "Descripción", minWidth: 100, align: "center" },
    {
      id: "startDate",
      label: "Fecha\u00a0de\u00a0Inicio",
      minWidth: 170,
      align: "center",
    },
    {
      id: "endDate",
      label: "Fecha\u00a0de\u00a0Finalización",
      minWidth: 170,
      align: "center",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "90%",
        overflow: "hidden",
        marginLeft: "50px",
        marginBottom: "50px",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ backgroundColor: "#007bff", color: "white" }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.product.name + row.startDate + row.endDate}
                  >
                    {columns.map((column, index) => {
                      const value =
                        index < 2 ? row["product"][column.id] : row[column.id];
                      return (
                        <TableCell
                          key={
                            column.id +
                            row.product.name +
                            row.startDate +
                            row.endDate
                          }
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelDisplayedRows={({ from, to, count }) => {
          return "" + from + "-" + to + " de " + count;
        }}
        labelRowsPerPage={"Reservas por página"}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
