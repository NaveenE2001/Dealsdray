import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { LockOpenRounded } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const userName = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/sigup", {
        name,
        userName,
        password,
      });
      console.log("Signup successful:", response.data);
      if (response.data.success) {
        navigate("/login");
      }
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "text.primary" }}>
            <LockOpenRounded />
          </Avatar>
          <Typography variant="h5" component="h1">
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
