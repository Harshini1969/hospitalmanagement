import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/medicalRecords")
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Medical Records
        </Typography>

        <Button
          variant="outlined"
          size="small"
          type="button"
          onClick={() => navigate("/")}
        >
          Back 
        </Button>

      </Stack>

      {/* Records */}
      {records.length === 0 ? (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 6 }}
        >
          No medical records found
        </Typography>
      ) : (
        <Stack spacing={3}>
          {records.map((r) => (
            <Card
              key={r.id}
              sx={{
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {r.patientName}
                  </Typography>

                  <Divider />

                  <Typography>
                    <b>Doctor:</b> {r.doctorName}
                  </Typography>

                  <Typography>
                    <b>Disease:</b> {r.disease}
                  </Typography>

                  <Typography>
                    <b>Prescription:</b> {r.prescription}
                  </Typography>

                  <Typography color="text.secondary">
                    <b>Date:</b> {r.date}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MedicalRecords;
