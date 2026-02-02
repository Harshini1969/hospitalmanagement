
import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";

const AddPrescription = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const doctorName = user?.name || user?.username || "Doctor";

  const [form, setForm] = useState({
    patient: "",
    diagnosis: "",
    medicines: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPrescription = async () => {
    if (!form.patient || !form.diagnosis || !form.medicines) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await api.post("/medicalRecords", {
        ...form,
        doctor: doctorName,
        date: new Date().toISOString().split("T")[0]
      });

      alert("Prescription added successfully");
      setForm({ patient: "", diagnosis: "", medicines: "", notes: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding prescription");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, px: 2 }}>
      <Paper elevation={6} sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 2, bgcolor: "#fafafa" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">Add Prescription</Typography>
          <Button variant="outlined" size="small" onClick={() => navigate("/admin/doctors")}>Back</Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField name="patient" label="Patient Name" fullWidth required value={form.patient} onChange={handleChange} />
          <TextField name="diagnosis" label="Diagnosis" fullWidth required value={form.diagnosis} onChange={handleChange} />
          <TextField name="medicines" label="Medicines" fullWidth required value={form.medicines} onChange={handleChange} placeholder="Separate multiple medicines with commas" />
          <TextField name="notes" label="Additional Notes" fullWidth multiline rows={4} value={form.notes} onChange={handleChange} placeholder="Optional notes or instructions" />
        </Box>

        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth onClick={addPrescription}>
          Save Prescription
        </Button>
      </Paper>
    </Box>
  );
};

export default AddPrescription;
