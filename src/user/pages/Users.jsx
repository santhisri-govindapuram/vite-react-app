import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import UsersList from '../components/UsersList';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users` 
          // 'http://localhost:5000/api/users'
        );

        setLoadedUsers(responseData.users);
        console.log("count", responseData.users);
        
      } catch (err) { }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && (
        <div className="center">
          {/* <CircularProgress /> */}
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
