import {Button, Card, CardBody, CardHeader, Input} from "@material-tailwind/react";
import {useState} from "react";
import Cookies from "universal-cookie/es6";
import * as api from "../Utils/api";
import Helper from "../Utils/Helper";
import {useHistory} from "react-router-dom";

export default function SettingsForm({className}) {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypedNewPassword, setRetypedNewPassword] = useState("");
    const [response, setResponse] = useState(undefined);
    const [fetching, setFetching] = useState(false);

    let history = useHistory();

    const changePasswordRequest = async () => {
        if(!response && !fetching){
            if(Helper.regexPassword(password) && Helper.regexPassword(newPassword)){
                if(newPassword === retypedNewPassword){
                    setFetching(true);
                    const cookies = new Cookies();

                    const changePasswordResponse = await
                        api.changePassword(password, newPassword, cookies.get("jwt"));

                    if(changePasswordResponse.status === "OK"){
                        history.push("/login");
                        cookies.remove("jwt");
                    }else{
                        setResponse(changePasswordResponse.status);
                    }
                    setFetching(false);
                }else{
                    setResponse("Hasła nie są takie same");
                }
            }else{
                setResponse("Hasło musi zawierać co najmniej 6 znaków (w tym co najmniej 1 cyfrę)");
            }
        }
    }

    return (
        <section className={className}>
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Zmień hasło do konta</h2>
                </div>
            </CardHeader>
            <CardBody>
                <h6 className="text-purple-500 text-sm mt-3 mb-5 font-light uppercase">
                    Podaj swoje aktualne hasło
                </h6>
                <div className="flex flex-wrap">
                    <Input
                        type="password"
                        color="purple"
                        placeholder="Hasło"
                        onChange={e => {setPassword(e.target.value); setResponse();}}
                    />
                </div>

                <h6 className="text-purple-500 text-sm my-6 mb-6 font-light uppercase">
                    Podaj swoje nowe hasło
                </h6>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-12/12 mb-6 font-light">
                        <Input
                            type="password"
                            color="purple"
                            placeholder="Nowe hasło"
                            onChange={e => {setNewPassword(e.target.value); setResponse();}}
                        />
                    </div>

                    <div className="w-full lg:w-12/12 font-light">
                        <Input
                            type="password"
                            color="purple"
                            placeholder="Wpisz swoje nowe hasło ponownie"
                            onChange={e => {setRetypedNewPassword(e.target.value); setResponse();}}
                        />
                    </div>
                    <h6 className="text-sm my-6 font-light uppercase w-full" >
                        *Po zatwierdzeniu zmiany nastąpi wylogownie*
                    </h6>

                    {response? <p className="w-full text-center text-red-500 mb-6"> {response}</p>: <> </>}

                    <Button
                        color="purple"
                        buttonType="outline"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="dark"
                        onClick={() => changePasswordRequest()}
                    >
                        Zmień hasło!
                    </Button>

                </div>

            </CardBody>
        </Card>
        </section>
    );
}