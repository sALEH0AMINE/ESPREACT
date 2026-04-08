import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

import { getInfoGrade } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoGrade } from "@/models/fonctionnaire.model";

import DataTable from "@/components/common/DataTable";
import Loader from "@/components/common/Loader";

import { gradeColumns } from "./gradeColumns";

export default function Grade({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getInfoGrade(id);
        setData(res.map(mapFonctionnaireInfoGrade));
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
        الدرجات
      </Typography>

      <DataTable columns={gradeColumns} rows={data} />
    </Box>
  );
}