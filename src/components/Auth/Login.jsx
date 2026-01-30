import { useState } from "react";
import {TextField,Button,Card,CardContent,Stack,Box,IconButton,InputAdornment,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrormsg("Please enter email and password");
      return;
    }

    try {
      let user = null;

      // --------- ADMIN ---------
      const adminRes = await axios.get("http://localhost:8000/admin");
      user = adminRes.data.find(
        (u) => u.email === email && u.password === password
      );

      // --------- PATIENT ---------
      if (!user) {
        const usersRes = await axios.get("http://localhost:8000/users");
        user = usersRes.data.find(
          (u) =>
            u.email === email && u.password === password && u.role === "patient"
        );
      }

      // --------- DOCTOR ---------
      if (!user) {
        const doctorRes = await axios.get("http://localhost:8000/doctors");
        user = doctorRes.data.find(
          (d) =>
            d.email === email &&
            d.password === password &&
            d.role === "doctor"
        );
      }

      if (!user) {
        setErrormsg("Invalid credentials");
        return;
      }

      // Save login info
      localStorage.setItem("token", "sedrfthgyjukl");
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      setErrormsg("");
      setEmail("");
      setPassword("");

      // Navigate based on role
      if (user.role === "admin") navigate("/adminDashboard");
      else if (user.role === "doctor") navigate("/doctorDashboard");
      else navigate("/patientDashboard");
    } catch (err) {
      console.log(err);
      setErrormsg("Server error, try again later");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8, px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 450, p: 3, boxShadow: 3 }}>
        <CardContent>
          <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Login</h2>
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {errormsg && (
                <p style={{ color: "red", textAlign: "center" }}>{errormsg}</p>
              )}

              <Button variant="contained" type="submit" fullWidth>
                Login
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
