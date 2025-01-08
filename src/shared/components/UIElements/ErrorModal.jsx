import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import CustomButton from "../../components/FormElements/Button";
import { useNavigate } from 'react-router-dom';

const ErrorModal = (props) => {
    const navigate = useNavigate();

    const handleOkayClick = () => {
        props.onClear(); // Call the onClear handler passed via props
        if (props.error !== "signal is aborted without reason") {
            navigate('/'); // Navigate to the home page
        }
    };
    return (
        <Modal
            open={!!props.error} // Controls whether the modal is open or not
            onClose={props.onClear} // Handles closing the modal
            aria-labelledby="error-modal-title"
            aria-describedby="error-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="error-modal-title" variant="h6" component="h2">
                    An Error Occurred!
                </Typography>
                <Typography id="error-modal-description" sx={{ mt: 2 }}>
                    {props.error}
                </Typography>
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <CustomButton onClick={handleOkayClick}>Okay</CustomButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default ErrorModal;
