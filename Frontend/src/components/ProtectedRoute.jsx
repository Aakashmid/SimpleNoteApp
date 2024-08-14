import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // for decoding info from token like expiration time etc
import api from "../Api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token); // decode token to get expiration time of token
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // Convert to seconds

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return isAuthorized ? children : <Navigate to="/login" />;  // if isAuthorized then go to the children page else to login 
}

export default ProtectedRoute;