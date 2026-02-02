import React, { useEffect, useState } from "react";
import api from "../API/Api";
import { Card, CardContent, Typography } from "@mui/material";

const DoctorPrescriptions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const doctorName =
    user?.name || user?.username || user?.email;

  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/medicalRecords")
      .then(res => {
        const filtered = doctorName
          ? res.data.filter(r => r.doctor === doctorName)
          : res.data;

        setRecords(filtered);
      });
  }, [doctorName]);

  return (
    <>
      <Typography variant="h5">My Prescriptions</Typography>

      {records.length === 0 ? (
        <Typography>No prescriptions found</Typography>
      ) : (
        records.map(r => (
          <Card key={r.id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography><b>Patient:</b> {r.patient}</Typography>
              <Typography><b>Diagnosis:</b> {r.diagnosis}</Typography>
              <Typography><b>Medicines:</b> {r.medicines}</Typography>
              <Typography><b>Notes:</b> {r.notes}</Typography>
              <Typography><b>Date:</b> {r.date}</Typography>
              <Typography><b>Doctor:</b> {r.doctor}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default DoctorPrescriptions;
