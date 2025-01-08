import React, { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <Box sx={{ textAlign: props.center ? 'center' : 'left', width: '100%' }}>
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: props.center ? 'center' : 'flex-start',
                    marginTop: 2,
                }}
            >
                <Box
                    sx={{
                        width: 200,
                        height: 200,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        overflow: 'hidden',
                        marginBottom: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" style={{ width: '100%' }} />
                    ) : (
                        <Typography variant="body2">Please pick an image.</Typography>
                    )}
                </Box>
                <Button variant="contained" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </Box>
            {!isValid && (
                <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                    {props.errorText}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUpload;
