// components/Auth/Register.jsx
import { useState } from "react";
import { TextField, Button, Card, CardContent, Stack } from "@mui/material";
import api from "../API/Api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setErrormsg("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrormsg("Passwords do not match");
      return;
    }

    const trimmedEmail = email.trim().toLowerCase(); 

    try {
      // Check duplicate email
      const existingUser = await api.get(`/users?email=${trimmedEmail}`);

      if (existingUser.data.find(u => u.email && u.email.toLowerCase() === trimmedEmail)) {
        setErrormsg("Email already registered");
        return;
      }

      // Register user
      const data = {
        name,
        email: trimmedEmail,
        phone,
        password,
        role: "patient"
      };

      const res = await api.post("/users", data);
      console.log("Registered user:", res.data);

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrormsg("Registration failed: " + (error.message || ""));
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
      <Card sx={{ width: "100%", maxWidth: 500, padding: 2 }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Patient Registration</h2>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />

              <TextField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />

              {errormsg && (
                <p style={{ color: "red", fontWeight: 600 }}>{errormsg}</p>
              )}

              <p>
                Already registered? <Link to="/login">Login</Link>
              </p>

              <Button variant="contained" type="submit" fullWidth>
                Register
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
