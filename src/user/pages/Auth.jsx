import React, { useState, useContext } from 'react';
import { Box, Typography, Divider, Grid2, CircularProgress } from '@mui/material';
import Input from '../../shared/components/FormElements/Input';
import CustomButton from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                console.log('Attempting to log in...');
                const responseData = await sendRequest(
                    import.meta.env.VITE_BACKEND_URL+'/users/login',
                    // 'http://localhost:5000/api/users/login',

                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log('Response Data:', responseData); // Log the response data
                if (responseData.userId && responseData.token) {
                    auth.login(responseData.userId, responseData.token);
                } else {
                    throw new Error('Login response is missing userId or token.');
                }
            } catch (err) {
                console.error('Login failed:', err);
            }
        } else {
            try {
                console.log('Attempting to sign up...');
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                const responseData = await sendRequest(
                    // process.env.REACT_APP_BACKEND_URL+'/users/signup'
                    
                    // 'http://localhost:5000/api/users/signup',
                    import.meta.env.VITE_BACKEND_URL+'/users/signup',


                    'POST',
                    formData
                );
                console.log('Signup Response Data:', responseData); // Log the response data
                if (responseData.userId && responseData.token) {
                    auth.login(responseData.userId, responseData.token);
                } else {
                    throw new Error('Signup response is missing userId or token.');
                }
            } catch (err) {
                console.error('Signup failed:', err);
            }
        }
    };


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
                }}
            >
                {/* {isLoading && <CircularProgress sx={{ mb: 2 }} />} */}
                {isLoading}

                <Typography variant="h5" sx={{ mb: 2 }}>
                    <strong>Login Required</strong>
                </Typography>
                <Divider sx={{ width: '100%', mb: 3 }} />
                <form onSubmit={authSubmitHandler} style={{ width: '100%' }}>
                    <Box sx={{ mb: 3 }}>
                        {!isLoginMode && (
                            <Input
                                element="input"
                                id="name"
                                type="text"
                                label="Your Name"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a name."
                                onInput={inputHandler}
                            />
                        )}
                    </Box>
                    {!isLoginMode && (
                        <Box sx={{ mb: 3 }}>
                            <ImageUpload
                                center
                                id="image"
                                onInput={inputHandler}
                                errorText="Please provide an image."
                            />
                        </Box>
                    )}
                    <Box sx={{ mb: 3 }}>
                        <Input
                            element="input"
                            id="email"
                            type="email"
                            label="E-Mail"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please enter a valid email address."
                            onInput={inputHandler}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <Input
                            element="input"
                            id="password"
                            type="password"
                            label="Password"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid password, at least 5 characters."
                            onInput={inputHandler}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <CustomButton danger type="submit" disabled={!formState.isValid}>
                            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                        </CustomButton>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <CustomButton inverse onClick={switchModeHandler}>
                            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                        </CustomButton>
                    </Box>
                </form>
            </Box>  

        </>
    );
};

export default Auth;
