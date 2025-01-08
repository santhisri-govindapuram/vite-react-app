import React from 'react';
import UserItem from './UserItem';
import { Grid2, Box } from '@mui/material';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: "1px solid black",
        width: "200px",
        margin: "auto",
      }}><br></br>
        <h2>No users found.</h2>
      </Box>
    );
  }

  return (
    <Grid2 container spacing={{ xs: 2, md: 10 }} columns={{ xs: 1, sm: 8, md: 12 }}>
      {props.items.map((user, index) => (
        <Grid2 item xs={12} sm={4} md={4} key={index}>
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default UsersList;
