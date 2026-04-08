import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

import { getInfoEchelon } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoEchelon } from "@/models/fonctionnaire.model";

import DataTable from "@/components/common/DataTable";
import Loader from "@/components/common/Loader";

import { echelonColumns } from "./echelonColumns";

export default function Echelon({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getInfoEchelon(id);
        setData(res.map(mapFonctionnaireInfoEchelon));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Box dir="rtl" mt={3}>
      <Typography
        variant="h6"
        sx={{
          borderBottom: "3px solid #cf2f2f",
          display: "inline-block",
          pb: 1,
        }}
      >
        الرتب
      </Typography>

      <DataTable columns={echelonColumns} rows={data} />
    </Box>
  );
}