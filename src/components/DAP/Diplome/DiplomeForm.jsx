import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Divider,
  Stack
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { getFonctId } from "@/config/devLocal";

export default function DiplomeForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    libelle: "",
    type: "",
    specialite: "",
    etablissement: "",
    dateObtention: "",
    langue: "",
    mention: "",
    nbAnnees: "",
    sujet: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        dateObtention: initialData.dateObtention ? initialData.dateObtention.split('T')[0] : "", // Format YYYY-MM-DD
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mappage vers le format API attendu
    const apiModel = {
      DIPLOME_ID: initialData?.id || 0,
      LibelleDiplome: form.libelle,
      TypeDiplome: form.type,
      DateObtention: form.dateObtention,
      DiplomeEtablissment: form.etablissement,
      DPLM_LANGUE: form.langue,
      DPLM_SPECIALITE: form.specialite,
      DPLM_MENTION: form.mention,
      DPLM_NBR_ANNEES: form.nbAnnees,
      DPLM_SUJET: form.sujet,
      IDFONC: initialData?.fonctionnaireId || getFonctId(),
    };

    onSubmit(apiModel);

    if (!initialData) {
      setForm({
        libelle: "",
        type: "",
        specialite: "",
        etablissement: "",
        dateObtention: "",
        langue: "",
        mention: "",
        nbAnnees: "",
        sujet: "",
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        {initialData ? "تعديل دبلوم" : "إضافة دبلوم جديد"}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Libellé / الدبلوم"
              name="libelle"
              value={form.libelle}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Type / النوع"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Spécialité / التخصص"
              name="specialite"
              value={form.specialite}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Établissement / المؤسسة"
              name="etablissement"
              value={form.etablissement}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date d'obtention / تاريخ الحصول"
              name="dateObtention"
              type="date"
              value={form.dateObtention}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Langue / اللغة"
              name="langue"
              value={form.langue}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mention / الميزة"
              name="mention"
              value={form.mention}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre d'années / عدد السنوات"
              name="nbAnnees"
              type="number"
              value={form.nbAnnees}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
          {initialData && (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={onCancel}
            >
              إلغاء
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{ px: 4 }}
          >
            {initialData ? "تحديث" : "حفظ"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}