import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography } from "@mui/material";

const PatientMedicalRecords = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/medicalRecords")
      .then(res => {
        const filtered = res.data.filter(
          r => r.patient === user.name
        );
        setRecords(filtered);
      });
  }, [user.name]);

  return (
    <Box mt={3}>
      <Typography variant="h5">My Prescriptions</Typography>

      {records.length === 0 && (
        <Typography>No prescriptions found</Typography>
      )}

      {records.map(r => (
        <Card key={r.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><b>Doctor:</b> {r.doctor}</Typography>
            <Typography><b>Diagnosis:</b> {r.diagnosis}</Typography>
            <Typography><b>Medicines:</b> {r.medicines}</Typography>
            <Typography><b>Date:</b> {r.date}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PatientMedicalRecords;
