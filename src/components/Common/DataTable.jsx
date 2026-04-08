import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import EmptyState from "./EmptyState";
  
  export default function DataTable({ columns, rows }) {
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table dir="rtl">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align="center"
                  sx={{ color: "#0d6efd", fontWeight: "bold" }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {rows && rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.id || index}>
                  {columns.map((col) => (
                    <TableCell key={col.field} align="center">
                      {col.render
                        ? col.render(row)
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }