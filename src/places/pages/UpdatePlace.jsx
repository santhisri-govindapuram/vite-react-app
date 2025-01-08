import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, Grid2, CircularProgress, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Input from '../../shared/components/FormElements/Input';
import CustomButton from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';



const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`
                    // `http://localhost:5000/api/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (err) { }
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`,
                // `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate('/' + auth.userId + '/places');
        } catch (err) { }
    };

    if (isLoading) {
        return (
            <div className="center">
                {/* <CircularProgress /> */}
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <Card sx={{ width: 600, margin: '16px auto', bgcolor: 'gray' }}>
                <CardActionArea>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>Could not find place!</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
                p: 2,
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: 600,
                mx: 'auto',
                position: 'relative', // For overlay placement
            }}
        >
            {isLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
                        zIndex: 10, // Ensures overlay is above content
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)', // Adds blur effect
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form onSubmit={placeUpdateSubmitHandler} style={{ width: '100%' }}>
                    <Box sx={{ mb: 3 }}>
                        <Input
                            id="title"
                            element="input"
                            type="text"
                            label="Title"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid title."
                            onInput={inputHandler}
                            initialValue={loadedPlace.title}
                            initialValid={true}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Input
                            id="description"
                            element="textarea"
                            label="Description"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid description (min. 5 characters)."
                            onInput={inputHandler}
                            initialValue={loadedPlace.description}
                            initialValid={true}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <CustomButton danger variant="contained" type="submit" disabled={!formState.isValid}>
                            UPDATE PLACE
                        </CustomButton>
                    </Box>
                </form>
            )}
        </Box>

    );
};

export default UpdatePlace;
