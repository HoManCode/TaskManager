import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ajax from "../services/ajax"
import { useUser } from '../services/UserProvider';

const PrivateRoute = (props) => {
    const user = useUser();
    const [isLoading, setIsLoaded] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const { children } = props;

    if( user && user.jwt ){
        ajax(`api/auth/validate`,"get",user.jwt)
        .then((isValid) => {
            setIsValid(isValid);
            setIsLoaded(false);
        });
    } else {
        return<Navigate to="/login" />;
    }


    return isLoading ? (
        <div> Loading ... </div>
    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login" />
    );
    
};

export default PrivateRoute;