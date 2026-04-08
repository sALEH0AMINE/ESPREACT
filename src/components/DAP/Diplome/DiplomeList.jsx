import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

export default function DiplomeList({ diplomes = [], onEdit, onDownload }) {
  if (!diplomes || diplomes.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">Aucun diplôme trouvé.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
      <Table sx={{ minWidth: 650 }} aria-label="diplomes table">
        <TableHead sx={{ bgcolor: "primary.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Libellé</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Spécialité</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Établissement</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date d'obtention</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diplomes.map((d) => (
            <TableRow key={d.id} hover>
              <TableCell>{d.libelle}</TableCell>
              <TableCell>{d.type}</TableCell>
              <TableCell>{d.specialite}</TableCell>
              <TableCell>{d.etablissement}</TableCell>
              <TableCell>{d.dateObtention}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(d)}
                  >
                    Modifier
                  </Button>
                  {d.document && (
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="secondary"
                      startIcon={<DownloadIcon />}
                      onClick={() => onDownload(d.document)}
                    >
                      Télécharger
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}