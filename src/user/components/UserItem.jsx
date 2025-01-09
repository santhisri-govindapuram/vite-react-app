import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardHeader, Typography, Grid, Box, CardContent } from '@mui/material';

const UserItem = (props) => {
  return (
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        flexDirection: 'column', // Ensure vertical stacking of items
        alignItems: 'center',
        gap: 3, // Space between each card
      }}
    >
      <Link to={`/${props.id}/places`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: 350,
            bgcolor: '#ffffff',
            borderRadius: 3,
            boxShadow: 6,
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)', // Slight lift effect
            },
            mb: 2, // Space between cards when stacked
          }}
        >
          {/* Card Header with Avatar and Title */}
          <CardHeader
            avatar={
              <Avatar
                // src={`${import.meta.env.VITE_ASSET_URL}/${props.image}`}
                src={props.image}

                // src={`http://localhost:5000/${props.image}`}
                alt={props.name}
                sx={{
                  width: 70,
                  height: 70,
                  border: '3px solid #007400', // Border around the avatar
                }}
              />
            }
            title={
              <Typography
                variant="h6"
                sx={{
                  color: '#007400', // Main color for title
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                {props.name}
              </Typography>
            }
            subheader={
              <Typography
                variant="body1"
                sx={{
                  color: '#777', // Subtle gray color for place count
                }}
              >
                {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
              </Typography>
            }
            sx={{
              backgroundColor: '#f5f5f5', // Light background for header
              padding: 2,
              textAlign: 'center',
            }}
          />

          {/* Card Content */}
          <CardContent
            sx={{
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: '#555',
              }}
            >
              This user has been a part of our community and has contributed places.
              Check their profile to explore more.
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default UserItem;