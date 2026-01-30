import React from "react";
import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const helpData = [
  "For appointments, go to the Appointments section.",
  "To view medical records, go to the Medical Records section.",
  "For any issues, contact support via email or phone.",
  "Ensure you are logged in to access patient or doctor dashboards.",
];

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        {/* Header */}
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ fontWeight: "bold", mb: 2 }}>
          Help & FAQs
        </Typography>

        {/* Back Button */}
        <Box textAlign="right" mb={3}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>

        <Typography variant="subtitle1" textAlign="center" mb={4} sx={{ color: "#555" }}>
          Find answers to the most common questions here.
        </Typography>

        {/* FAQ Card */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            maxWidth: 800,
            margin: "0 auto",
            backgroundColor: "#e3f2fd",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          {helpData.map((item, index) => (
            <Box key={index} sx={{ mb: index !== helpData.length - 1 ? 2 : 0 }}>
              <Typography variant="body1" sx={{ fontSize: 16, color: "#333" }}>
                {index + 1}. {item}
              </Typography>
              {index !== helpData.length - 1 && <Divider sx={{ my: 1.5 }} />}
            </Box>
          ))}
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default HelpPage;
