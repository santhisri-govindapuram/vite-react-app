import React, { useReducer, useEffect } from 'react';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
import CustomTextarea from '../FormElements/CustomTextarea';
import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element = props.element === 'input' ? (
        <TextField
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
            variant="outlined"
            sx={{ width: "100%" }}
        />
    ) : (
        <CustomTextarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}
        >
            <InputLabel htmlFor={props.id}><strong>{props.label}</strong></InputLabel>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <Typography variant="body2" color="error">{props.errorText}</Typography>
            )}
        </Box>
    );
};

export default Input;



// border: '1px solid blue',
// borderColor: !inputState.isValid && inputState.isTouched ? 'red' : 'blue',
// padding: 2,
// borderRadius: 1,
// '& .MuiTypography-root': {
//     color: !inputState.isValid && inputState.isTouched ? 'red' : 'inherit',
// }