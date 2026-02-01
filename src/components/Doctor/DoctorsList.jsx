import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from "@mui/material";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleViewAppointments = (doctorName) => {
    axios
      .get(`http://localhost:8000/appointments`)
      .then((res) => {
        const appointments = res.data.filter(
          (app) => app.doctor === doctorName
        );

        axios.get("http://localhost:8000/patients").then((pRes) => {
          const allPatients = pRes.data;

          const doctorPatients = appointments
            .map((app) =>
              allPatients.find((p) => p.name === app.patient)
            )
            .filter(Boolean);

          setPatients(doctorPatients);
          setSelectedDoctor(doctorName);
          setOpenModal(true);
        });
      })
      .catch((err) => console.error(err));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDoctor(null);
    setPatients([]);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* HEADER */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 3,
          backgroundColor: "#ffffff"
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Doctors
        </Typography>

        <Button variant="outlined" size="small" onClick={() => navigate("/")}>
          Back
        </Button>
      </Paper>

      {/* DOCTORS GRID */}
      <Grid container spacing={4}>
        {doctors.length === 0 ? (
          <Typography>No doctors found</Typography>
        ) : (
          doctors.map((d) => (
            <Grid item xs={12} sm={6} md={4} key={d.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {d.name}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    <b>Specialization:</b> {d.specialization}
                  </Typography>

                  <Typography color="text.secondary">
                    <b>Experience:</b> {d.experience} years
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* ACTION BUTTONS */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewAppointments(d.name)}
                    >
                      View Appointments
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        navigate(`/admin/addPrescription?doctor=${d.name}`)
                      }
                    >
                      Add Prescription
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* MODAL */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {selectedDoctor} - Patients
        </DialogTitle>

        <DialogContent dividers>
          {patients.length === 0 ? (
            <Typography>No patients found.</Typography>
          ) : (
            patients.map((p, index) => (
              <TableContainer
                component={Paper}
                sx={{ mb: 3, borderRadius: 2 }}
                key={index}
              >
                <Table size="small">
                  <TableBody>
                    {[
                      ["Name", p.name],
                      ["Age", p.age],
                      ["Gender", p.gender],
                      ["Phone", p.phone],
                      ["Email", p.email],
                      ["Disease", p.disease],
                    ].map(([label, value]) => (
                      <TableRow key={label}>
                        <TableCell sx={{ fontWeight: "bold", width: 150 }}>
                          {label}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))
          )}
        </DialogContent>

        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button variant="outlined" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DoctorsList;
