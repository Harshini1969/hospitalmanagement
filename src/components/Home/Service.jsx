import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const servicesData = [
  { name: "General Checkup", description: "Routine health checkup for all ages." },
  { name: "Cardiology", description: "Heart-related consultations and treatments." },
  { name: "Neurology", description: "Brain and nervous system care." },
  { name: "Pediatrics", description: "Child healthcare services." },
  { name: "Emergency Services", description: "24/7 emergency medical assistance." },
  { name: "Orthopedics", description: "Bone, joint, and muscle treatments." },   // added
  { name: "Dermatology", description: "Skin, hair, and nail care services." },   // added
];

const cardColors = [
  "#e3f2fd",
  "#e8f5e9",
  "#fff3e0",
  "#fce4ec",
  "#ede7f6",
  "#e0f7fa",
  "#fffde7",
];

const Service = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          Our Services
        </Typography>

        {/* Back Button */}
        <Box textAlign="right" mt={4}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Back 
          </Button>
        </Box>

        <Typography variant="subtitle1" textAlign="center" mb={4}>
          We provide a wide range of healthcare services to meet your needs.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                sx={{ 
                  p: 3, 
                  minHeight: 150, 
                  backgroundColor: cardColors[index % cardColors.length] 
                }}
              >
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2" mt={1}>{service.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Service;
