import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Box,Card,CardContent,Typography,Button,Grid,Paper} from "@mui/material";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
<Paper
  elevation={3}
  sx={{
    p: 2,
    mb: 3,
    position: "relative",
    display: "flex",
    alignItems: "center"
  }}
>
  {/* CENTER TITLE */}
  <Typography
    variant="h4"
    fontWeight="bold"
    sx={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)"
    }}
  >
    Patients Details
  </Typography>

  {/* RIGHT BUTTONS */}
  <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
    <Button
      variant="outlined"
      size="small"
      type="button"
      onClick={() => navigate("/")}
    >
      Back 
    </Button>
  </Box>
</Paper>


      {/* PATIENT CARDS */}
      <Grid container spacing={3}>
        {patients.length === 0 ? (
          <Typography sx={{ ml: 2 }}>No patients found</Typography>
        ) : (
          patients.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/admin/patients/${p.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PatientList;
