import * as React from "react";

import { Box, Typography } from "@mui/material";
import { useBookingsQuery, useGuestsQuery } from "../../../store/api";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "id" | "guestId" | "isFullyPaid" | "amount";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "guestId", label: "GuestId", minWidth: 100 },
  {
    id: "isFullyPaid",
    label: "IsFullyPaid",
    minWidth: 170,
    align: "right",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  id: string;
  guestId: string;
  //   bookedDate: number;
  isFullyPaid: string;
  amount: number;
}

function createData(
  id: string,
  guestId: string,
  //   bookedDate: number,
  isFullyPaid: "YES" | "NO",
  amount: number
): Data {
  return { id, guestId, isFullyPaid, amount };
}

const rows = [
  createData("1", "a", "NO", 1000),
  createData("2", "b", "NO", 2000),
  createData("3", "c", "YES", 3000),
  createData("4", "d", "NO", 4000),
  createData("5", "e", "YES", 5000),
  createData("6", "f", "NO", 6000),
];

export const BookingList = ({ label }: { label: string }) => {
  const { data: bookings, isLoading, isError } = useBookingsQuery();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    if (bookings) {
      console.log(bookings);
    }
  }, [bookings, isLoading]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Box sx={{ mb: 5, mt: 5 }}>
        <Typography
          fontWeight={500}
          color="primary"
          letterSpacing={4}
          textAlign="center"
          variant="h5"
        >
          {label}
        </Typography>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
