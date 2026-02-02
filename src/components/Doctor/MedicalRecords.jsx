// MedicalRecords.jsx
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get("/medicalRecords").then(res => {
      if(user && user.role==="patient"){
        const filtered = res.data.filter(r=>r.patientId===user.id || r.patientName===user.name);
        setRecords(filtered);
      } else { setRecords(res.data); }
    }).catch(err=>console.log(err));
  }, [user]);

  return (
    <Box sx={{ p:4, bgcolor:"#f5f7fa", minHeight:"100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Medical Records</Typography>
        <Button variant="outlined" size="small" onClick={()=>navigate("/")}>Back</Button>
      </Stack>
      {records.length===0 ? <Typography align="center" color="text.secondary" sx={{ mt:6 }}>No medical records found</Typography> :
        <Stack spacing={3}>
          {records.map(r=>(
            <Card key={r.id} sx={{ borderRadius:3, boxShadow:2 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight="bold">{r.patientName}</Typography>
                  <Divider />
                  <Typography><b>Doctor:</b> {r.doctorName}</Typography>
                  <Typography><b>Disease:</b> {r.disease}</Typography>
                  <Typography><b>Prescription:</b> {r.prescription}</Typography>
                  <Typography color="text.secondary"><b>Date:</b> {r.date}</Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      }
    </Box>
  );
};

export default MedicalRecords;
