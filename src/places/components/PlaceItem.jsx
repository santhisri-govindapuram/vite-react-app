import React, { useState, useContext } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Modal, Typography, Box, CircularProgress } from '@mui/material';
import CustomButton from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PlaceItem = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);


    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/places/${props.id}`,
                // `http://localhost:5000/api/places/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (err) { }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card sx={{ width: 600, margin: '16px auto', color: "white" }}>
                {isLoading}
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        // src={`${import.meta.env.VITE_ASSET_URL}/${props.image}`}
                        // src={`http://localhost:5000/${props.image}`}
                        src={props.image}

                        alt={props.title}

                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography style={{ fontSize: "20px", color: "black" }}>
                            {props.title}
                        </Typography>
                        <Typography style={{ fontSize: "20px", color: "black" }}>
                            {props.address}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardContent>
                    <Box sx={{
                        display: 'flex', flexDirection: {
                            xs: 'column', // column on extra-small screens
                            sm: 'row',    // row on small screens and up
                        }, justifyContent: 'space-around', alignItems: 'center',
                        gap: 2,
                        marginTop: 2,
                    }}>
                        <CustomButton inverse variant="outlined" onClick={handleOpen}>VIEW ON MAP</CustomButton>
                        {auth.isLoggedIn && (

                            <CustomButton to={`/places/${props.id}`} variant="contained">EDIT</CustomButton>
                        )}
                        {auth.isLoggedIn && (
                            <CustomButton danger variant="contained" onClick={showDeleteWarningHandler}>DELETE</CustomButton>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <strong>{props.address}</strong>
                    </Typography>
                    <Box sx={{ height: '80%', width: '100%' }}>
                        <Map center={props.coordinates} zoom={10} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CustomButton variant="contained" onClick={handleClose}>Close</CustomButton>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={showConfirmModal}
                onCancel={cancelDeleteHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <strong> Do you want to proceed and delete this place? Please note that it
                            can't be undone thereafter.</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 10 }}>
                        <CustomButton inverse variant="outlined" onClick={cancelDeleteHandler}>CANCEL</CustomButton>
                        <CustomButton danger variant="contained" onClick={confirmDeleteHandler}>DELETE</CustomButton>
                    </Box>
                </Box>
            </Modal>
        </>


    );
};

export default PlaceItem;


