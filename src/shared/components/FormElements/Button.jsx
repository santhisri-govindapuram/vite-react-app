import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CustomButton = (props) => {
    const { href, to, exact, size = 'medium', inverse, danger, type, onClick, disabled, children } = props;

    const buttonStyles = {
        default: {
            padding: '8px 16px',
            backgroundColor: danger ? 'red' : 'blue',
            color: 'white',
            '&:hover': {
                backgroundColor: danger ? 'darkred' : 'darkblue',
            },
            '&.Mui-disabled': {
                backgroundColor: 'gray',
                color: 'white',
            },
        },
        inverse: {
            backgroundColor: 'white',
            color: danger ? 'red' : 'blue',
            border: `1px solid ${danger ? 'red' : 'blue'}`,
            '&:hover': {
                backgroundColor: danger ? 'lightcoral' : 'lightblue',
            },
        },
    };

    const appliedStyles = {
        ...buttonStyles.default,
        ...(inverse && buttonStyles.inverse),
    };

    if (href) {
        return (
            <MuiButton component="a" href={href} sx={appliedStyles} size={size}>
                {children}
            </MuiButton>
        );
    }

    if (to) {
        return (
            <MuiButton component={RouterLink} to={to} exact={exact ? 'true' : undefined} sx={appliedStyles} size={size}>
                {children}
            </MuiButton>
        );
    }

    return (
        <MuiButton sx={appliedStyles} size={size} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </MuiButton>
    );
};

export default CustomButton;
