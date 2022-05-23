import React, {useState} from "react";
import H5 from "@material-tailwind/react/Heading5";
import {Button, Card, CardBody, CardFooter, CardHeader, Checkbox, InputIcon} from "@material-tailwind/react";
import Cookies from "universal-cookie/lib";
import * as api from "../../Utils/api";
import Helper from "../../Utils/Helper";
import {useHistory} from "react-router-dom";

const LoginContainer = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [response, setResponse] = useState("");

    let history = useHistory();

    const login = async () => {
        if (!fetching && response === undefined) {
            setFetching(true);

            const token = await Helper.getRecaptchaResult();

            const loginResponse = await api.adminLoginRequest(username, password, token);

            if (loginResponse.jwt != null) {
                const cookie = new Cookies();
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);

                cookie.set("jwt", loginResponse.jwt,
                    {path: "/", expires: tomorrow});


                Helper.checkTokenIsValid().then((bool) => {
                    Helper.createEventGA4("Login", "login_attempt", "result is valid");
                    if (bool) history.push("/dashboard");
                });
            } else {
                setResponse({message: "Nieprawidłowy login lub hasło!", valid: false});
                Helper.createEventGA4("Login", "login_attempt", "result is not valid");
            }
            setFetching(false);
        }
    }

    return(
        <section className="section_login">
            <div className="container_login">
                <Card>
                    <CardHeader color="blueGray">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Logowanie
                        </H5>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-12 px-4 bg-bb">
                            <InputIcon
                                type="email"
                                color="blueGray"
                                placeholder="Podaj nazwę użytkownika"
                                iconName="email"
                                onChange={e => {setUsername(e.target.value); setResponse();}}
                            />
                        </div>
                        <div className="mb-8 px-4">
                            <InputIcon
                                type="password"
                                color="blueGray"
                                placeholder="Podaj hasło"
                                iconName="lock"
                                onChange={e => {setPassword(e.target.value); setResponse();}}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <Checkbox
                                color="blueGray"
                                text="Zapamiętaj mnie"
                                id="remember"
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        {response !== undefined? <p style={response.valid? {color: "green"}: {color: "red"}}>{response.message}</p>: <></>}
                        <div className="flex justify-center bg-bb">

                            <Button
                                color="blueGray"
                                buttonType="link"
                                size="lg"
                                ripple="dark"
                                onClick={() => login()}
                            >
                                Zaloguj się
                            </Button>

                        </div>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

export default LoginContainer;