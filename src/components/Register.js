import LockOpenRounded from "../dealsdray_logo.jpg";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const designations = ["HR", "Manager", "Developer"];
const coursesList = ["MCA", "BCA", "B.Tech", "M.Tech"];

function Register() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("userName", event.target.email.value); // Ensure correct email field
    formData.append("mobileNo", event.target.mobileNo.value);
    formData.append("designation", event.target.designation.value);
    formData.append("gender", event.target.gender.value);
    formData.append("courses", selectedCourse); // Ensure correct course field
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${token}`,
          },
        }
      );
      console.log("User registered successfully:", response.data);
      if (response.data._id) {
        navigate("/employe/table");
        window.location.reload();
      }

      alert("User register succssfully");
    } catch (error) {
      alert("All fields are mandatory");
      console.error("Error registering user:", error.response.data);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Save the file to send it to the server
    } else {
      setImage(null);
      setImageFile(null);
      alert("Please select a valid image file (JPG or PNG).");
    }
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
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
          <Avatar
            sx={{ m: 0, bgcolor: "text.primary", width: 100, height: 60 }}
            src={LockOpenRounded}
          />
          <Typography variant="h5" component="h1" mt={1}>
            Registration Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              id="name"
              required
              name="name"
              label="Name"
              fullWidth
              autoFocus
              autoComplete="name"
            />
            <TextField
              name="email"
              margin="normal"
              required
              id="email"
              fullWidth
              autoComplete="email"
              label="Email address"
              type="email" // Ensure the input is of type email for better validation
            />
            <TextField
              name="mobileNo"
              margin="normal"
              required
              id="mobileNo"
              fullWidth
              autoComplete="tel"
              label="Mobile Number"
            />
            <TextField
              select
              name="designation"
              margin="normal"
              required
              id="designation"
              fullWidth
              label="Designation"
            >
              {designations.map((designation) => (
                <MenuItem key={designation} value={designation}>
                  {designation}
                </MenuItem>
              ))}
            </TextField>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row name="gender" defaultValue="M">
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Courses</FormLabel>
              <RadioGroup
                row
                name="courses"
                value={selectedCourse}
                onChange={handleCourseChange}
              >
                {coursesList.map((course) => (
                  <FormControlLabel
                    key={course}
                    value={course}
                    control={<Radio />}
                    label={course}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 1, mb: 1, width: "70%", mr: 5 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                name="image"
                id="image"
              />
            </Button>
            {image && (
              <Box
                component="img"
                src={image}
                alt="Selected"
                sx={{ width: "30%", height: "30%", mt: 2, marginLeft: "10%" }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
