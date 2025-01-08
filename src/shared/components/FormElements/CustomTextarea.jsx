import React from 'react';
import { TextField } from '@mui/material';

const CustomTextarea = (props) => {
    const { id, rows = 3, onChange, onBlur, value } = props;

    return (
        <TextField
            id={id}
            multiline
            rows={rows}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            variant="outlined"
            sx={{ width: "100%" }}
        />
    );
};

export default CustomTextarea;
