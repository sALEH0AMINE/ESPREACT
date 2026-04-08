import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box
} from "@mui/material";

import { getInfoPerso } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoPerso } from "@/models/fonctionnaire.model";

import InfoField from "./InfoField";

export default function InfoPerso({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getInfoPerso(id);
        setData(mapFonctionnaireInfoPerso(res));
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <Card sx={{ mt: 3, borderRadius: 3 }} dir="rtl">
      <CardContent>

        {/* HEADER */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            src={data.imgDataURL}
            sx={{ width: 70, height: 70 }}
          />
          <Box>
            <Typography variant="h6">
              {data.nomAr} {data.prenomAr}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.nomFr} {data.prenomFr}
            </Typography>
          </Box>
        </Box>

        {/* INFOS GRID */}
        <Grid container spacing={2}>
          <InfoField label="رقم البطاقة الوطنية" value={data.cin} />
          <InfoField label="تاريخ الازدياد" value={data.dateNaissance?.slice(0,10)} />
          <InfoField label="مكان الازدياد" value={data.lieuNaissance} />
          <InfoField label="الجنس" value={data.sexe} />
          <InfoField label="الحالة العائلية" value={data.situationFamiliale} />
          <InfoField label="عدد الأطفال" value={data.nombreEnfants} />
          <InfoField label="الهاتف المحمول" value={data.telephoneMobile} />
          <InfoField label="الهاتف الثابت" value={data.telephoneFixe} />
          <InfoField label="البريد الإلكتروني" value={data.email} />
          <InfoField label="العنوان" value={data.adresse} />
        </Grid>

      </CardContent>
    </Card>
  );
}