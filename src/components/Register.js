import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio, // Add this import
  RadioGroup,
  FormLabel,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOpenRounded from "@mui/icons-material/LockOpenRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const designations = ["HR", "Manager", "Developer"];
const coursesList = ["MCA", "BCA", "B.Tech", "M.Tech"];

function Register() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("userName", event.target.email.value);
    formData.append("mobileNo", event.target.mobileNo.value);
    formData.append("designation", event.target.designation.value);
    formData.append("gender", event.target.gender.value);
  
    selectedCourses.forEach((course) => formData.append("courses[]", course)); // Append each course separately
  
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
  
      alert("User registered successfully");
    } catch (error) {
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
    const value = event.target.value;
    setSelectedCourses((prev) =>
      prev.includes(value)
        ? prev.filter((course) => course !== value)
        : [...prev, value]
    );
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
              type="email"
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
              <FormGroup row>
                {coursesList.map((course) => (
                  <FormControlLabel
                    key={course}
                    control={
                      <Checkbox
                        value={course}
                        checked={selectedCourses.includes(course)}
                        onChange={handleCourseChange}
                      />
                    }
                    label={course}
                  />
                ))}
              </FormGroup>
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
