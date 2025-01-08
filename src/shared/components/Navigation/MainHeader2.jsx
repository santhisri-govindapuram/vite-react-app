import React, { useState, useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../context/auth-context';
import CustomButton from '../FormElements/Button';
import imageSrc from "../../Images/logo.png"


const MainHeader2 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#007400' }}> {/* Dark green background */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo Section - Left Side */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={imageSrc} // Path to your logo image (placed in the public folder)
              alt="Logo"
              style={{ height: 40, marginRight: '16px' }} // Adjust size and spacing as needed
            />
          </Box>

          {/* Title Section */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: isMobile ? 'center' : 'left', color: 'white' }}>
            Explore
          </Typography>

          {/* Menu Icon for Mobile */}
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {/* Desktop Menu */}
              <MenuItem component={NavLink} to="/" sx={{ color: 'white' }}>
                ALL USERS
              </MenuItem>
              {auth.isLoggedIn && (
                <MenuItem component={NavLink} to={`/${auth.userId}/places`} sx={{ color: 'white' }}>
                  MY PLACES
                </MenuItem>
              )}
              {auth.isLoggedIn && (
                <MenuItem component={NavLink} to="/places/new" sx={{ color: 'white' }}>
                  ADD PLACE
                </MenuItem>
              )}
              {!auth.isLoggedIn && (
                <MenuItem component={NavLink} to="/auth" sx={{ color: 'white' }}>
                  AUTHENTICATE
                </MenuItem>
              )}
              {auth.isLoggedIn && (
                <CustomButton onClick={auth.logout} sx={{ color: 'white' }}>LOGOUT</CustomButton>
              )}
            </>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/" sx={{ color: 'black' }}>
                ALL USERS
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to={`/${auth.userId}/places`} sx={{ color: 'black' }}>
                MY PLACES
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/places/new" sx={{ color: 'black' }}>
                ADD PLACE
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={NavLink} to="/auth" sx={{ color: 'black' }}>
                AUTHENTICATE
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainHeader2;
