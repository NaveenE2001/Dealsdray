import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
  const navigate = useNavigate();
  const [name, setName] = React.useState(null);
  const handleclick = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25vh",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ textDecoration: "underline", color: "darkred" }}
        >
          Forgot Password
        </Typography>
        <TextField
          id="fotgot"
          name="for"
          placeholder="Enter the Email Id"
          label="User Name"
          fullWidth
          margin="defult"
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <br />
        <Button variant="contained" sx={{ margin: 1, alignItems: "center" }}>
          Submit
        </Button>
        <Button variant="contained" onClick={handleclick}>
          {" "}
          Back
        </Button>
      </Box>
    </div>
  );
}

export default Forgotpassword;
