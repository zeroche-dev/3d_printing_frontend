import React, {useEffect, useState} from "react";
import {Button, Label} from "@material-tailwind/react";
import Cookies from "universal-cookie/es6";
import * as api from "../../Utils/api";
import DialogBox from "../DialogBox/DialogBox";
import Helper from "../../Utils/Helper";
import {getStatusString} from '../../Utils/UtilFunctions';

const ProjectDetails = ({id, name, phoneNumber, email, date, ipAddress, status, updateTable, conversationKey, removeProjectStates, address}) => {
    const [statusState, setStatusState] = useState(0); //<select> state holder
    const [oldOrderStatus, setOldOrderStatus] = useState(0); //db state holder
    const [showModal, setShowModal] = useState(false);
    const [fetchingChangeStatus, setFetchingChangeStatus] = useState(false);
    useEffect( () => {
        setOldOrderStatus(status);
        setStatusState(status);
    }, [id, status]);
    const changeProjectStatus = () => {
        const cookies = new Cookies();
        setFetchingChangeStatus(true);
        api.changeProjectStatus(conversationKey, statusState ,cookies.get("jwt")).then(e => {
            setFetchingChangeStatus(false);
            if (e.status === statusState) { //If server returned changed status then its all ok :)
                setOldOrderStatus(e.status);
                updateTable();
            }
        });
    }
    const removeProject = async () => {
        const cookies = new Cookies();
        const removeProjectResponse = await api.removeProject(conversationKey, cookies.get("jwt"))
        if (removeProjectResponse.status === "OK") {
            removeProjectStates();
        }
    }
    const showModalHandler = (showModalData, valueData ) => {
        setShowModal(showModalData);
        if(valueData) removeProject();
    }
    return (
        <>
            <div className="contact_form_information">
            <hr/>
                    <p>Imię i nazwisko: <span>{name}</span></p>
                    <p>Numer telefonu: <span>{phoneNumber}</span></p>
                    <p>Email: <span>{email}</span></p>
                    <p>Adres: <span>{address}</span></p>
                    <hr/>
                    <p>Data wysłania zgłoszenia: <span>{date}</span></p>
                    <p>Link do konwersacji użytkownika: <span><a target="_blank" rel="noreferrer" href={Helper.getConversationLink(conversationKey)}>{Helper.getConversationLink(conversationKey)}</a></span></p>
                    <p>Adres ip: <span>{ipAddress}</span></p>
                    <hr/>
                    <div className="status_inline">
                        <Button
                            color="lightBlue"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            onClick={() => setShowModal(true)}
                        >
                            Usuń projekt
                        </Button>
                    </div>
                    <hr/>
                    <div className="status_inline">
                    <Label color={"lightBlue"}> 
                    <span> Status zamówienia: <select value={oldOrderStatus} disabled={true} style={{padding: "10px", background: "inherit"}}>
                            <option value="0">{getStatusString(0)}</option>
                            <option value="1">{getStatusString(1)}</option>
                            <option value="2">{getStatusString(2)}</option>
                            <option value="3">{getStatusString(3)}</option>
                            <option value="4">{getStatusString(4)}</option>
                        </select> </span>
                        </Label>
                        <Label color={"lightBlue"} style={{padding: "10px"}}>
                        <div className="status_inline">
                        <select value={statusState} onChange={(e)=>{setStatusState(e.target.value)}} style={{padding: "10px", borderRadius: "10px"}}>
                            <option value="0">{getStatusString(0)}</option>
                            <option value="1">{getStatusString(1)}</option>
                            <option value="2">{getStatusString(2)}</option>
                            <option value="3">{getStatusString(3)}</option>
                            <option value="4">{getStatusString(4)}</option>
                        </select>
                        <Button
                            color="lightBlue"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            onClick={() => {
                                !fetchingChangeStatus && changeProjectStatus()
                            }}
                        >
                           {!fetchingChangeStatus ? <>Zmień</> : <i className='sp-white'></i>}
                        </Button>  </div></Label>
                    </div>   
            </div>
            <DialogBox showModal={showModal} modalHandler={showModalHandler}
                       titleModal="Usuń projekt" descriptionModal="Jesteś pewny, że chcesz usunąć ten Projekt?"></DialogBox>
        </>
    )
}

export default ProjectDetails;
