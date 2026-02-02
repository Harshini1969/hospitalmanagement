
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import api from "../API/Api";

const AddMedicalRecord = () => {
  const doctor = JSON.parse(localStorage.getItem("user"));
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [disease, setDisease] = useState("");
  const [prescription, setPrescription] = useState("");

  useEffect(() => {
    api.get("/patients").then(res => setPatients(res.data));
  }, []);

  const addRecord = async () => {
    if (!patientId || !disease || !prescription) {
      alert("Fill all fields");
      return;
    }

    const patient = patients.find(p => p.id === Number(patientId));

    await api.post("/medicalRecords", {
      patientId,
      patientName: patient.name,
      doctorName: doctor.name,
      disease,
      prescription,
      date: new Date().toISOString().split("T")[0]
    });

    alert("Medical record added");
    setDisease("");
    setPrescription("");
    setPatientId("");
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Add Medical Record</Typography>

      <TextField
        select
        fullWidth
        label="Select Patient"
        value={patientId}
        onChange={e => setPatientId(e.target.value)}
        sx={{ mt: 2 }}
      >
        {patients.map(p => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Disease"
        fullWidth
        sx={{ mt: 2 }}
        value={disease}
        onChange={e => setDisease(e.target.value)}
      />

      <TextField
        label="Prescription"
        fullWidth
        multiline
        rows={3}
        sx={{ mt: 2 }}
        value={prescription}
        onChange={e => setPrescription(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={addRecord}>
        Save Record
      </Button>
    </Box>
  );
};

export default AddMedicalRecord;
