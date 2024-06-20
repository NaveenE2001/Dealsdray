import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { SearchOutlined } from "@mui/icons-material";
import UpdateDialog from "./UpdateDialog";
import { useNavigate } from "react-router-dom";

export default function DataTable() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [fetchTrigger, setFetchTrigger] = React.useState(false);
  const [searchOptions, setSearchOptions] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const baseURL = "http://localhost:5000/images/";
  const token = sessionStorage.getItem("token");
  console.log(token);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/all", {
        headers: {
          token: `${token}`,
        },
      });
      const users = response.data.map((user) => ({
        id: user._id,
        name: user.name,
        userName: user.userName,
        mobileNo: user.mobileNo,
        designation: user.designation,
        gender: user.gender,
        courses: user.courses.join(", "),
        image: user.image,
      }));
      setRows(users);
      setSearchOptions(
        users.map((user) => ({ label: user.name, id: user._id }))
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUsersBySearch = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/search?name=${query}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      const users = response.data.map((user) => ({
        id: user._id,
        name: user.name,
        userName: user.userName,
        mobileNo: user.mobileNo,
        designation: user.designation,
        gender: user.gender,
        courses: user.courses.join(", "),
        image: user.image,
      }));
      setRows(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setFetchTrigger(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete.id}`, {
        headers: {
          token: `${token}`,
        },
      });
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== userToDelete.id)
      );
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      setFetchTrigger(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleSearchInputChange = (event, value) => {
    if (value) {
      setSearchInput(value.label);
    } else {
      setSearchInput("");
      fetchUsers(); // fetch all users if search input is cleared
    }
  };

  const handleSearch = () => {
    if (searchInput) {
      fetchUsersBySearch(searchInput);
    } else {
      fetchUsers(); // fetch all users if search input is empty
    }
  };

  const renderActionsCell = (params) => (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen(params.row)}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDeleteClick(params.row)}
        style={{ marginLeft: 8 }}
      >
        Delete
      </Button>
    </>
  );

  React.useEffect(() => {
    if (fetchTrigger) {
      fetchUsers();
      setFetchTrigger(false);
    }
  }, [fetchTrigger]);

  React.useEffect(() => {
    fetchUsers();
  }, []);
  const navigate = useNavigate();
  const handleRegisterclick = () => {
    navigate("/employe/register");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid container xs>
        <Grid item xs={6}>
          <Button
            sx={{ m: 2 }}
            variant="contained"
            onClick={handleRegisterclick}
          >
            Register
          </Button>
        </Grid>
        <Grid
          item
          xs={5.8}
          display="flex"
          justifyContent="flex-end"
          marginRight={0.3}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              border: "none",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={searchOptions}
              sx={{ width: 300, marginRight: "8px" }}
              onChange={handleSearchInputChange}
              renderInput={(params) => (
                <TextField {...params} label="Search By Name" />
              )}
            />
            <IconButton onClick={handleSearch}>
              <SearchOutlined />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={[
          { field: "id", headerName: "ID", width: 190 },
          { field: "name", headerName: "Name", width: 140 },
          { field: "userName", headerName: "Email", width: 210 },
          { field: "mobileNo", headerName: "Mobile No", width: 140 },
          { field: "designation", headerName: "Designation", width: 140 },
          { field: "gender", headerName: "Gender", width: 90 },
          { field: "courses", headerName: "Courses", width: 120 },
          {
            field: "image",
            headerName: "Image",
            width: 120,
            renderCell: (params) => {
              const imageUrl = `${baseURL}${params.value}`;

              return (
                <img
                  src={imageUrl}
                  alt="User"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              );
            },
          },
          {
            field: "actions",
            headerName: "Actions",
            width: 240,
            renderCell: renderActionsCell,
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      {selectedUser && (
        <UpdateDialog
          open={open}
          handleClose={handleClose}
          user={selectedUser}
        />
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
