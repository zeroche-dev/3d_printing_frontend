import React, {useEffect, useState} from "react";
import "@material-tailwind/react/tailwind.css";
import {Button, Checkbox, Input, Paragraph, Textarea} from "@material-tailwind/react";
import H5 from "@material-tailwind/react/Heading5";
import Cookies from "universal-cookie/es6";
import * as api from "../../Utils/api";
import FetchedImage from "../../elements/FetchedImage/FetchedImage";
import DialogBox from "../DialogBox/DialogBox";


const EditImageForm = ({classNames, refreshFunc, id, alt, description, title, date, deleteFunc}) =>{

    const [titleUpdate, setTitleUpdate] = useState("");
    const [descriptionUpdate, setDescriptionUpdate] = useState("");
    const [altUpdate, setAltUpdate] = useState("");
    const [dateUpdate, setUpdateDate] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [response, setResponse] = useState([]);
    const [showDialogBox, setShowDialogBox] = useState(false);

    useEffect(() => {
        setTitleUpdate(title);
        setDescriptionUpdate(description);
        setAltUpdate(alt);
        setUpdateDate(false);
        setFetching(false);
        setResponse();
    }, [id])

    const handlerShowDialogBox = (showModalData, valueData) => {
        setShowDialogBox(showModalData);
        if(valueData) {
            setFetching(true);
            deleteFunc();
        }
    }

    const updateImageData = async () => {
        if(!fetching && titleUpdate !== ""){
            const cookies = new Cookies();

            setFetching(true);

            let formdata = new FormData();
            formdata.append("id", id);
            if(descriptionUpdate !== description) formdata.append("description", descriptionUpdate);
            if(titleUpdate !== title) formdata.append("title", titleUpdate);
            if(altUpdate !== alt) formdata.append("alt", altUpdate);
            formdata.append("changeDate", dateUpdate);

            const updateResponse = await api.updateImage(formdata, cookies.get("jwt"));

            if(updateResponse.status === "OK"){
                setResponse({message: "Zmiany zostały zapisane!", valid: true});
                refreshFunc();
            }else{
                setResponse({message: "Nie udało się zapisać zmian!", valid: false})
            }
            setFetching(false);
        }
    }

        return (
            <div className={classNames}>
                <H5 color="lightBlue">Dodaj nowe zdjęcie projektu na stronę!</H5>

                <FetchedImage imageId={id} imageAlt={alt} />

                <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Tutuł projektu"
                value={titleUpdate}
                onChange={e => {setTitleUpdate(e.target.value); setResponse();}}
            />
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Alternatywny tekst zdjęcia"
                onChange={e => {setAltUpdate(e.target.value); setResponse();}}
                value={altUpdate}
            />

            <Textarea
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Opis projektu"
                value={descriptionUpdate}
                onChange={e => {setDescriptionUpdate(e.target.value); setResponse();}}
            />

                <div className="change_date_div">
                    <Paragraph> <span style={{color: "purple"}}>Data dodania: </span> {date}</Paragraph>

                    <Checkbox
                        color="blueGray"
                        text="Zmień zapisaną date zdjęcia na aktualną"
                        id="remember"
                        checked={dateUpdate}
                        onChange={e => setUpdateDate(e.target.checked)}
                    />
                </div>



            {fetching?  <p><i className='sp-white'></i> Zapisywanie zmian!</p>: <></>}
            {response !== undefined? <p  style={response.valid?{color: "green"}: {color: "red"}}>{response.message}</p>: <></> }

            <div className="buttons_in_row">
                <Button
                    color="green"
                    buttonType="outline"
                    size="lg"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                    onClick={() => updateImageData()}
                >
                    Zapisz zmiany!
                </Button>
                <Button
                    color="red"
                    buttonType="outline"
                    size="lg"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="dark"
                    onClick={() => setShowDialogBox(true)}
                >
                    Usuń zdjęcie!
                </Button>
            </div>
                <DialogBox titleModal="Usuń zdjęcie" descriptionModal="Czy napewno chcesz usunąć to zdjęcie?"
                           showModal={showDialogBox} modalHandler={handlerShowDialogBox}></DialogBox>

            </div>
        );

}

export default EditImageForm;