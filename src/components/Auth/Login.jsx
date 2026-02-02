// components/Auth/Login.jsx
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../API/Api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [adminRes, usersRes, doctorsRes] = await Promise.all([
        api.get("/admin"),
        api.get("/users"),
        api.get("/doctors")
      ]);

      const admin = adminRes.data;
      const users = usersRes.data;
      const doctors = doctorsRes.data;

      const user =
        admin.find(a => a.email === email && a.password === password) ||
        users.find(u => u.email === email && u.password === password) ||
        doctors.find(d => d.email === email && d.password === password);

      if (!user) {
        setErrormsg("Invalid credentials");
        return;
      }

      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") navigate("/adminDashboard");
      else if (user.role === "doctor") navigate("/doctorDashboard");
      else navigate("/patientDashboard");

    } catch (err) {
      console.error(err);
      setErrormsg("Server error");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Card sx={{ width: 450, p: 3 }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {errormsg && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {errormsg}
                </p>
              )}

              <Button type="submit" variant="contained">
                LOGIN
              </Button>

              <p style={{ textAlign: "center" }}>
                Don`t have an account? <Link to="/register">Register</Link>
              </p>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
