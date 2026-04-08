import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Paper, Typography
  } from "@mui/material";
  
  export default function SoldesTable({ data }) {
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }} dir="rtl">
        <Typography variant="h6" sx={{ p: 2, borderBottom: "3px solid red" }}>
          الرصيد
        </Typography>
  
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">السنة</TableCell>
              <TableCell align="center">الرصيد</TableCell>
              <TableCell align="center">مفعل؟</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {data.length > 0 ? (
              data.map((s) => (
                <TableRow key={s.id}>
                  <TableCell align="center">{s.annee}</TableCell>
                  <TableCell align="center">{s.nombre}</TableCell>
                  <TableCell align="center">
                    {s.estAnnule ? "نعم" : "لا"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  لا توجد بيانات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }