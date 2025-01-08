import React, { useEffect, useState, useCallback  } from 'react';

import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { CircularProgress } from '@mui/material';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/places/user/${userId}`
                    // `http://localhost:5000/api/places/user/${userId}`

                );
                setLoadedPlaces(responseData.places);
                console.log(responseData.places);
                
            } catch (err) { }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    // Handler for deleting a place
    const placeDeletedHandler = useCallback(
        (deletedPlaceId) => {
            setLoadedPlaces((prevPlaces) =>
                prevPlaces.filter((place) => place.id !== deletedPlaceId)
            );
        },
        [setLoadedPlaces] // Dependencies
    );

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    {/* <CircularProgress /> */}
                </div>
            )}
            {!isLoading && loadedPlaces && (
                <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
            )}
        </>
    );
};

export default UserPlaces;
