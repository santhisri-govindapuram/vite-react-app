import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import PlaceItem from "./PlaceItem";
import CustomButton from '../../shared/components/FormElements/Button';

const PlaceList = props => {
    if (props.items.length === 0) {
        return (
            <Card sx={{ width: 600, margin: '16px auto', bgcolor: 'gray' }}>
                <CardActionArea>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>No Place found. Maybe create one?</Typography>
                        {/* <CustomButton variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>Share Place</CustomButton> */}
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {props.items.map(place => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={props.onDeletePlace}

                />
            ))}
        </Box>

    );

};

export default PlaceList;