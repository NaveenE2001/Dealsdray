import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import dealsedrey from "../dealsdray_logo.jpg";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === "Logout") {
      sessionStorage.removeItem("token");
      navigate("/login");
      // Add your logout logic here
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={dealsedrey} alt="logo" sx={{ marginRight: 1 }} />
          <Typography
            variant="h6"
            noWrap
            className="headingtext"
            href="#app-bar-with-responsive-menu"
            sx={{}}
          >
            Deals Drey
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <Avatar
              alt="User"
              src="/static/images/avatar/2.jpg"
              onClick={handleOpenUserMenu}
              sx={{ cursor: "pointer" }}
            />{" "}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
