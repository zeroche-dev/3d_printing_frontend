import {Alert, Button, Card, CardBody, CardHeader, Input} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/es6";
import * as api from "../Utils/api";

export default function MailSettingsForm({className}) {

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(undefined);

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypeNewPassword, setRetypeNewPassword] = useState("");
    const [response, setResponse] = useState(undefined);
    const [valid, setValid] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(async () => {
        const cookies = new Cookies();
        const configuration = await api.getSmtpConfiguration(cookies.get("jwt"));

        if(configuration){
            setEmail(configuration.email);
            setStatus(configuration.enabled);
        }
    }, [])

    const changeMailBotStatus = async () =>{
        setResponse(undefined);
        const cookies = new Cookies();
        const smtpUpdateResponse = await api.smtpUpdateConfiguration(cookies.get("jwt"), "", "", !status);

        if(smtpUpdateResponse){
            setStatus(!status);
            setResponse("Status bota mailowego został zmieniony!");
            setValid(true);
        }
    }
    
    const changeMailData = async () => {
        if(newPassword === retypeNewPassword){
            const cookies = new Cookies();

            const changeMailDataResponse = await api.smtpUpdateConfiguration(cookies.get("jwt"), newEmail, newPassword, status);

            if(changeMailDataResponse.status === "OK"){
                setResponse("Dane zostały zmienione!");
                setValid(true);
                setEmail(newEmail);
            }
        }else{
            setResponse("Hasła nie są takie same");
            setValid(false);
        }
    }

    const checkSmtpIsWorking = async () => {
        if (!fetching) {
            setResponse(undefined);
            setFetching(true);

            const cookies = new Cookies();

            const response = await api.checkSmtpIsWorking(cookies.get("jwt"));

            if(response.status === "OK"){
                setResponse("Bot mailowy działa poprawnie!");
                setValid(true);
            }
            else{
                setResponse(response.status);
                setValid(false);
            }
            setFetching(false);
        }
    }

    const displayInline = {
        display: "inline-flex",
        gap: "30px",
        marginBottom: "7px",
        alignItems: "center"
    }

    return (
        <section className={className}>
            <Card>
                <CardHeader color="blue" contentPosition="none">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-white text-2xl">Konfiguracja bota mailowego</h2>
                    </div>
                </CardHeader>
                <CardBody>

                    {response? <Alert color={valid? "green": "red"}>{response}</Alert>: <></>}

                    <div style={displayInline}>
                        <h6 className="text-sm font-light uppercase">
                            Status bota: <span className={status? "text-green-500": "text-red-500"}>{status? "Włączony": "Wyłączony"} </span>
                        </h6>

                        <Button
                            color={status? "red": "green"}
                            buttonType="filed"
                            size="sm"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            onClick={() => changeMailBotStatus()}
                        >
                            {status? "Wyłącz": "Włącz"}
                        </Button>

                    </div>

                    <h6 className="text-sm mt-3 mb-5 font-light uppercase">
                        Email konta: <span className="text-blue-500">{email}</span>
                    </h6>

                    <div style={displayInline}>

                        <h6 className="text-sm font-light uppercase">
                            Sprawdz czy bot mailowy działa poprwanie!
                        </h6>

                        <Button
                            color="blue"
                            buttonType="filed"
                            size="sm"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            onClick={() => checkSmtpIsWorking()}
                        >
                            {!fetching? "Sprawdz": <i className='sp-white'></i>}
                        </Button>

                    </div>


                    <h6 className="text-blue-500 text-sm mt-3 mb-5 font-light uppercase">
                        Podaj dane do zmiany aktualnego bota google gmail na nowego
                    </h6>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-12/12 mb-6 font-light">
                            <Input
                                type="email"
                                color="blue"
                                placeholder="Email"
                                onChange={e => {setNewEmail(e.target.value); setResponse();}}
                            />
                        </div>



                        <div className="w-full lg:w-12/12 mb-6 font-light">
                            <Input
                                type="password"
                                color="blue"
                                placeholder="Nowe hasło"
                                onChange={e => {setNewPassword(e.target.value); setResponse();}}
                            />
                        </div>

                        <div className="w-full lg:w-12/12 font-light mb-6">
                            <Input
                                type="password"
                                color="blue"
                                placeholder="Wpisz nowe hasło ponownie"
                                onChange={e => {setRetypeNewPassword(e.target.value); setResponse();}}
                            />
                        </div>

                        <Button
                            color="blue"
                            buttonType="outline"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            onClick={() => changeMailData()}
                        >
                            Zmień dane bota!
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}