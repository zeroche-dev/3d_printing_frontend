import React, {useEffect, useRef, useState} from "react";
import "@material-tailwind/react/tailwind.css";
import {Button, Input, Textarea} from "@material-tailwind/react";
import H5 from "@material-tailwind/react/Heading5";
import H6 from "@material-tailwind/react/Heading5";
import Cookies from "universal-cookie/es6";
import * as api from "../../Utils/api";



const AddImageForm = ({classNames, refreshFunc}) =>{

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [alt, setAlt] = useState("");
    const [imagePath, setImagePath] = useState();
    const [response, setResponse] = useState();
    const [fetching, setFetching] = useState(false);
    let inputFileRef = useRef();

    const sendImage = async () => {
        if(imagePath !== undefined && title !== "" && !fetching){

            setFetching(true);
            let formdata = new FormData();
            formdata.append("file", imagePath);
            formdata.append("description", description);
            formdata.append("title", title);
            formdata.append("alt", alt);

            const cookies = new Cookies();

            const sendResponse = await api.sendImage(formdata, cookies.get("jwt"));

            if (sendResponse.status === "OK"){
                console.log("success");
                setResponse({message: "Zdjęcie zostało dodane!", valid: true});
                refreshFunc();

                //clear previous variables
                setTitle("");
                setDescription("");
                setAlt("");
                setImagePath();
                inputFileRef.current.value = ""; //reset input field
            }else{
                setResponse({message: "Nie udało się dodać zdjęcia!", valid: false});
            }
            setFetching(false);
        }else{
            setResponse({message: "Wybrane zdjęcie i pole z tytułem nie mogą być puste!", valid: false});
        }
    }

    return(
        <div className={classNames}>
            <H5 color="lightBlue">Dodaj nowe zdjęcie projektu na stronę!</H5>

            <input type="file"
                   ref={inputFileRef}
                   onChange={e => {setImagePath(e.target.files[0]); setResponse();}}>
            </input>

            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Tutuł projektu"
                value={title}
                onChange={e => {setTitle(e.target.value); setResponse();}}
            />
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Alternatywny tekst zdjęcia"
                value={alt}
                onChange={e => {setAlt(e.target.value); setResponse();}}
            />

            <Textarea
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Opis projektu"
                value={description}
                onChange={e => {setDescription(e.target.value); setResponse();}}
            />

            {fetching? <p><i className='sp-white'></i> Wysyłanie zdjęcia prosze czekać...!</p>: <> </>}
            {response !== undefined ? <p style={response.valid? {color: "green"}: {color: "red"}}>{response.message}</p>: <> </>}

            <Button
                color="lightBlue"
                buttonType="link"
                size="lg"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="dark"
                onClick={() => sendImage()}
            >
                Dodaj zdjęcie
            </Button>
        </div>
    )
}

export default AddImageForm;