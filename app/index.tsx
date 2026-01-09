import { Redirect } from 'expo-router';
import * as securestore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';

const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await securestore.getItemAsync('userToken');
            setLoggedIn(token ? true : false);
            setLoading(false);
        };
        checkLogin();
    }, []);

    return (
        <>
            {loading ?
                null :
                (<Redirect href={loggedIn ? "/(tabs)" : "/(routes)/onboarding"} />)}
        </>
    )
}

export default Index;