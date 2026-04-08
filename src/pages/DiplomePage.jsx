import React, { useEffect, useState } from "react";
import { getDiplomes, createDiplome, updateDiplome } from "@/services/diplomeService";
import { mapDiplome } from "../models/Diplome/models.models";
import DiplomeForm from "@/components/DAP/Diplome/DiplomeForm";
import DiplomeList from "@/components/DAP/Diplome/DiplomeList";
import { getFonctId } from "@/config/devLocal";
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Breadcrumbs, 
  Link as MuiLink,
  CircularProgress,
  Fade
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";

export default function DiplomePage() {
  const fonctId = getFonctId();

  const [diplomes, setDiplomes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadDiplomes = async () => {
    try {
      setLoading(true);
      const res = await getDiplomes(fonctId);
      const mapped = (res?.ExistingDiplomes || res || []).map(mapDiplome);
      setDiplomes(mapped);
    } catch (err) {
      console.error("Erreur chargement diplômes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiplomes();
  }, []);

  const handleSubmit = async (model) => {
    try {
      if (editing) {
        await updateDiplome(model);
        setEditing(null);
      } else {
        await createDiplome(model);
      }
      setShowForm(false);
      loadDiplomes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header & Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink underline="hover" color="inherit" href="/">
            الرئيسية
          </MuiLink>
          <Typography color="text.primary">الدبلومات</Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              الدبلومات المحصل عليها
            </Typography>
          </Box>
          
          {!showForm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setShowForm(true);
                setEditing(null);
              }}
              sx={{ px: 3, py: 1 }}
            >
              إضافة دبلوم
            </Button>
          )}
        </Box>
      </Box>

      {/* Form Section */}
      {showForm && (
        <Fade in={showForm}>
          <Box>
            <DiplomeForm
              onSubmit={handleSubmit}
              initialData={editing}
              onCancel={() => setShowForm(false)}
            />
          </Box>
        </Fade>
      )}

      {/* List Section */}
      <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DiplomeList
            diplomes={diplomes}
            onEdit={(d) => {
              setEditing(d);
              setShowForm(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDownload={(doc) => console.log("Downloading", doc)}
          />
        )}
      </Paper>
    </Container>
  );
}