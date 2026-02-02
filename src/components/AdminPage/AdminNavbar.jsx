import { useEffect, useState } from "react";
import {Grid,Card,CardContent,Typography,Button,Box,Avatar} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import api from "../API/Api"; 

export default function PatientPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/patients").then((res) => setPatients(res.data));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/patients/${id}`);
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <>
      <AdminNavbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" align="center" mb={4}>
          Patient Details
        </Typography>

        <Grid container spacing={4}>
          {patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  textAlign: "center"
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 60,
                      height: 60,
                      margin: "auto",
                      mb: 2
                    }}
                  >
                    {patient.name.charAt(0)}
                  </Avatar>

                  <Typography variant="h6" fontWeight="bold">
                    {patient.name}
                  </Typography>

                  <Typography color="text.secondary">
                    Age: {patient.age}
                  </Typography>

                  <Typography color="text.secondary">
                    Email: {patient.email}
                  </Typography>

                  <Typography color="text.secondary">
                    Phone: {patient.phone}
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
