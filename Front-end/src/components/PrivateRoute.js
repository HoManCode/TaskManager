import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../services/UserProvider';
import AuthService from "../services/AuthService";

const PrivateRoute = (props) => {
    const user = useUser();
    const [isLoading, setIsLoaded] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const { children } = props;

    if( user.jwt ){
        AuthService.validateUser(user.jwt)
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