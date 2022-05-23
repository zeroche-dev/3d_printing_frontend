import React, {useEffect, useState} from "react";
import "@material-tailwind/react/tailwind.css";
import H1 from "@material-tailwind/react/Heading1";
import Button from "@material-tailwind/react/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () =>{
    useEffect(()=>{

    }, []);

    const history = useHistory();
    const goBack = () =>
     {
         //TODO:
         //More logic needed
        window.location.href = '/';
     }

    return(
        <section className="not-found-section">
            <H1 color="white">Tu nic nie ma :(</H1>
            <Button
                color="green"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                onClick={()=>{goBack()}}
            >
            Wracam
            </Button>
        </section>
    )
}

export default NotFound;