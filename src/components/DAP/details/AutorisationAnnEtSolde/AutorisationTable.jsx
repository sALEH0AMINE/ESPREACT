import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Paper, Typography
  } from "@mui/material";
  
  export default function AutorisationTable({ data }) {
    return (
      <TableContainer component={Paper} sx={{ mt: 5 }} dir="rtl">
        <Typography variant="h6" sx={{ p: 2, borderBottom: "3px solid red" }}>
          الرخص السنوية
        </Typography>
  
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">البداية</TableCell>
              <TableCell align="center">النهاية</TableCell>
              <TableCell align="center">النهاية الفعلية</TableCell>
              <TableCell align="center">عدد الأيام</TableCell>
              <TableCell align="center">ملاحظات</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {data.length > 0 ? (
              data.map((a) => (
                <TableRow key={a.id}>
                  <TableCell align="center">{a.dateDebut?.slice(0, 10)}</TableCell>
                  <TableCell align="center">{a.dateFin?.slice(0, 10)}</TableCell>
                  <TableCell align="center">{a.dateFinEffet?.slice(0, 10)}</TableCell>
                  <TableCell align="center">{a.nombreJours}</TableCell>
                  <TableCell align="center">{a.remarques}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  لا توجد بيانات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }