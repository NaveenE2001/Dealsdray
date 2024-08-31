import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  Checkbox,
  TextField,
  FormGroup,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const designations = ["HR", "Manager", "Developer"];
const coursesList = ["MCA", "BCA", "B.Tech", "M.Tech"];

function UpdateDialog({ open, handleClose, handleUpdate, user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: user.name || "",
    email: user.userName || "",
    mobileNo: user.mobileNo || "",
    designation: user.designation || "",
    gender: user.gender || "",
    courses:
      typeof user.courses === "string"
        ? user.courses.split(",").map((course) => course.trim())
        : Array.isArray(user.courses)
        ? user.courses
        : [], // Ensure this is always an array
    image: user.image || "",
  });
  console.log(user);

  const token = sessionStorage.getItem("token");
  const baseURL = "http://localhost:5000/uploads/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => {
      const currentCourses = Array.isArray(prev.courses) ? prev.courses : [];
      const newCourses = currentCourses.includes(value)
        ? currentCourses.filter((course) => course !== value)
        : [...currentCourses, value];
      return { ...prev, courses: newCourses };
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);

      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    } else {
      alert("Please select a valid image file (JPG or PNG).");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        {
          ...formData,
          userName: formData.email,
        },
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/employe/table");
        window.location.reload();
      }
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the user details and click "Update" to save changes.
        </DialogContentText>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
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
            value={formData.name}
            onChange={handleInputChange}
            autoFocus
            autoComplete="name"
          />
          <TextField
            name="email"
            margin="normal"
            required
            id="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            label="Email address"
          />
          <TextField
            name="mobileNo"
            margin="normal"
            required
            id="mobileNo"
            fullWidth
            value={formData.mobileNo}
            onChange={handleInputChange}
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
            value={formData.designation}
            onChange={handleInputChange}
            label="Designation"
          >
            {designations.map((designation) => (
              <MenuItem key={designation} value={designation}>
                {designation}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Courses</FormLabel>
            <FormGroup>
              {coursesList.map((course) => (
                <FormControlLabel
                  key={course}
                  control={
                    <Checkbox
                      value={course}
                      checked={formData.courses.includes(course)}
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
            sx={{ mt: 2, mb: 2, display: "flex" }}
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
          {formData.image && (
            <Box
              component="img"
              src={user.image ? `${baseURL}${formData.image}` : formData.image}
              alt="Selected"
              sx={{ width: "30%", height: "auto", marginLeft: "35%" }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} type="submit" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateDialog;
