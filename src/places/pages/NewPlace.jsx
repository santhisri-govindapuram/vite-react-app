import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import { Box, Grid2, CircularProgress } from '@mui/material';
import Input from '../../shared/components/FormElements/Input';
import CustomButton from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';




const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(import.meta.env.VITE_BACKEND_URL + '/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      navigate('/');
    } catch (err) { }
  };

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
      }}
    >
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={placeSubmitHandler}>
        {isLoading}
        <Box sx={{ width: '100%', mb: 3 }}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
        </Box>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
          />
        </Box>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
          />
        </Box>
        <Box sx={{ width: '100%', mb: 3, textAlign: 'center' }}>
          <ImageUpload
            id="image"
            onInput={inputHandler}
            sx={{ textAlign: 'center' }}
            errorText="Please provide an image."
          />
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <CustomButton danger variant="contained" type="submit" disabled={!formState.isValid}>
            ADD PLACE
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
};

export default NewPlace;
