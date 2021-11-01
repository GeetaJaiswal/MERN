import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function Logout() {
    const history = useHistory();
    const logoutPage = async () => {
        try {
            const res = await fetch('/logout', {
                method: "GET",
                header: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
        
            console.log(res); 
            
            if(res.status===200)
            {
                history.push("/login");
            }
        }catch(e){
            console.log(e);
        }
    }
    
    
    useEffect(() => {
        logoutPage();
    }, []);

    return (
        <>
            <h1>logout</h1>
        </>
    )
}

export default Logout
