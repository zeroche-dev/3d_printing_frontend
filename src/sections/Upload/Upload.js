import React, { useState } from 'react';
import { Card, Paragraph } from '@material-tailwind/react';
import  H1 from '@material-tailwind/react/Heading1';
import  H4 from '@material-tailwind/react/Heading4';
import { InputIcon, Input, Textarea, Button } from '@material-tailwind/react';
import DropZone from '../../components/DropZone/DropZone';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegramPlane} from '@fortawesome/free-brands-svg-icons'
import * as api from "../../Utils/api";
import {useHistory } from 'react-router-dom';
import Helper from "../../Utils/Helper";
const Upload = () =>{
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [projectFile, setProjectFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [notFilled, setNotFilled] = useState(false);

    const history = useHistory();
    const sendProject = async () => {
        if(name &&
           RegExp(/^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/).test(phoneNumber) &&
           email &&
           description &&
           projectFile) {
            setFetching(true);
            setNotFilled(false);

            const token = await Helper.getRecaptchaResult();

            let formdata = new FormData();
            formdata.append("file", projectFile[0]);
            formdata.append("description", description);
            formdata.append("nameAndLastName", name);
            formdata.append("email", email);
            formdata.append("address", address);
            formdata.append("phoneNumber", phoneNumber);
            formdata.append("captcha", token);
            api.createProject(formdata).then(e => {
                setUrl(e.status);
                setFetching(false);
                Helper.createEventGA4("New project", "created_project", "created project by: " + name);
                history.push(Helper.getConversationLink(e.status));
            });
        }else {
            setNotFilled(true);
        }
    }
    let buttonMsg = <span>Wyślij <FontAwesomeIcon icon={faTelegramPlane}/></span>;
    return(<section className='up-section' data-aos="zoom-in"  data-aos-duration="600" id='order'>
        <H1>Wyślij swój projekt!</H1>
        <Card className='up-container' data-aos="zoom-in">
            <div className='up-container-wing'>
            <H4 data-aos="zoom-in">Kontakt</H4>
            <InputIcon
                type="text"
                color="blueGray"
                size="lg"
                outline={true}
                placeholder="Imię i nazwisko*"
                iconFamily="material-icons"
                iconName="person"
                onChange={e => setName(e.target.value)}
                />
                <Input
                type="text"
                color="blueGray"
                size="lg"
                outline={true}
                placeholder="Adres"
                onChange={e => setAddress(e.target.value)}
                />
                <Input
                type="tel"
                color="blueGray"
                size="lg"
                outline={true}
                placeholder="Telefon*"
                value={phoneNumber}
                onChange={e => { setPhoneNumber(e.target.value) }}
                />
                <Input
                type="text"
                color="blueGray"
                size="lg"
                outline={true}
                placeholder="E-mail*"
                onChange={e => setEmail(e.target.value)}
                />
                <Textarea
                color="blueGray"
                size="regular"
                outline={true}
                placeholder="Opis"
                onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className='up-container-wing' >
            <H4 data-aos="zoom-in">Pliki projektu</H4>
                <DropZone onFileRejected={(f)=>{setProjectFile(null)}} onFileAccepted={(f) => {setProjectFile(f)}}className="dropzone"/>
            </div>
        </Card>
        { notFilled && <i style={{color: "red", margin: "10px"}}> Wypełnij wszystkie pola poprawnie i załącz plik!</i> }
        <div className="up-submit-btn">
        <Button style={{width: "100%", textAlign: "center"}}
            color="green"
            buttonType="filled"
            size="lg"
            rounded={false}
            block={true}
            iconOnly={false}
            ripple="light"
            onClick={(fetching||url)?()=>{}:()=>sendProject()}
        >
           {!fetching?<>{buttonMsg}</>:<><i className='sp-white'></i>Sending your project please wait...!</>} 
        </Button>
        </div>

    </section>);
}
export default Upload;