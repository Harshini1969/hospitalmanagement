import React from "react";
import { Paper, Typography } from "@mui/material";

const SectionDisplay = ({ section }) => {
  const servicesData = [
    "General Checkup",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Emergency Services",
  ];

  const contactData = {
    phone: "+91 9876543210",
    email: "support@hospital.com",
    address: "123, Main Street, City, Country",
  };

  const helpData = [
    "For appointments, go to Appointments section.",
    "For medical records, go to Medical Records section.",
    "For any issues, contact support.",
  ];

  switch (section) {
    case "services":
      return (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Our Services:</Typography>
          {servicesData.map((s, i) => <Typography key={i}>• {s}</Typography>)}
        </Paper>
      );
    case "contact":
      return (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Contact Us:</Typography>
          <Typography>Phone: {contactData.phone}</Typography>
          <Typography>Email: {contactData.email}</Typography>
          <Typography>Address: {contactData.address}</Typography>
        </Paper>
      );
    case "help":
      return (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>Help:</Typography>
          {helpData.map((h, i) => <Typography key={i}>• {h}</Typography>)}
        </Paper>
      );
    default:
      return null;
  }
};

export default SectionDisplay;
