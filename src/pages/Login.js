import React, {useEffect, useState} from "react";
import LoginContainer from "../sections/Login/LoginContainer";
import { useHistory } from "react-router-dom";
import Helper from "../Utils/Helper";

const Login = () =>{

    let history = useHistory();

    useEffect(async () => {
        Helper.checkTokenIsValid().then((bool) => {
            if(bool) history.push("/dashboard");
        });
    }, []);

    return(
        <>
            <LoginContainer />
        </>
    )
}

export default Login;