import React, {useEffect, useState} from "react";
import adminImage from "../../assets/images/admin.jpg";
import MessengerInput from "../../elements/MessengerInput/MessengerInput";
import MemChatBox from "../../elements/ChatBox/ChatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faBoxOpen, faHourglass, faWrench } from "@fortawesome/free-solid-svg-icons";
import { Paragraph } from "@material-tailwind/react";
import H1 from '@material-tailwind/react/Heading1';
import H4 from '@material-tailwind/react/Heading4';
import Button from "@material-tailwind/react/Button";
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getAllMessages, getProjectData, sendMessage, lastTimeActivity} from "../../redux/messages/operations";

const ClientPanel = ({projectid}) =>
{
    const dispatch = useDispatch();

    const [copyied, setCopied] = useState(false);

    const messages = useSelector(state => state.messagesReducer.messages);
    const projectData = useSelector(state => state.messagesReducer.projectData);
    const lastTimeActive = useSelector(state => state.messagesReducer.lastTimeActive);


    useEffect(() => {
        dispatch(getProjectData(projectid));
        dispatch(lastTimeActivity());
        dispatch(getAllMessages(projectid));
    }, [])

    return(projectData ? <section className="clientpanel_section">
        <div className="clientpanel_inline_panels">
            <section className="clientpanel_status">
                { projectData != null ? <>
                    <header>
                        <H4 color={"white"}>Status zamówienia</H4>
                    </header>
                    <div className="clientpanel_status_bar">
                        <div className="clientpanel_status_item">
                            <FontAwesomeIcon size={"3x"} icon={faHourglass} color={projectData.orderStatus == 0 ? "#ffd531" : "white"}></FontAwesomeIcon>
                            <p>Oczekuje</p>
                        </div>
                        <div className="clientpanel_status_item">
                            <FontAwesomeIcon size={"3x"} icon={faBookReader} color={projectData.orderStatus == 1 ? "#27CE49" : "white"}></FontAwesomeIcon>
                            <p>Przyjęto</p>
                        </div>
                        <div className="clientpanel_status_item">
                            <FontAwesomeIcon size={"3x"} icon={faWrench} color={projectData.orderStatus  == 2 ? "#69c5fd" : "white"}></FontAwesomeIcon>
                            <p>W realizacji</p>
                        </div>
                        <div className="clientpanel_status_item">
                            <FontAwesomeIcon size={"3x"} icon={faBoxOpen} color={projectData.orderStatus  == 3 ? "#FFFF00" : "white"}></FontAwesomeIcon>
                            <p>Wysłano</p>
                        </div>
                    </div>
                    <hr style={{borderTop: "1px solid #333"}}/>
                    <div className="clientpanel_userdata" style={{textAlign: "center"}}>
                        <Paragraph style={{fontWeight: "bold", color: "red", textAlign: "center"}}>
                            Twój link do statusu zamówienia: <br/>
                            <a href={window.location.href} style={{fontWeight: "bold", color: "#4d90fe"}}>{window.location.href}</a>
                        </Paragraph>
                        <Button
                            color="lightBlue"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            onClick={() => {  navigator.clipboard.writeText(window.location.href); setCopied(true)}}
                        >
                            { !copyied ? <>Kopiuj</> : <>Skopiowano!</> }
                        </Button>
                        <p style={{fontSize: "1em"}}> Zapisz ten link w bezpiecznym miejscu i nie dawaj go nikomu, dzięki temu linkowi będziesz mógł sprawdzić status swojego zamówienia. </p>

                    </div>
                    <hr style={{borderTop: "1px solid #333"}}/>
                    <div className="clientpanel_userdata">
                        <H4 color={"white"} style={{marginTop: "1.4em"}}>Dane zamawiającego</H4>
                        <Paragraph>Imię i nazwisko: {projectData.nameAndLastName}</Paragraph>
                        <Paragraph>Adres:  {projectData.address}</Paragraph>
                        <Paragraph>Nr Tel:  {projectData.numberPhone}</Paragraph>
                        <Paragraph>E-mail:  {projectData.email}</Paragraph>
                        <Paragraph>Data złożenia zamówienia:  {projectData.date}</Paragraph>
                    </div>
                </> : <div style={{textAlign: "center", alignItems: "center"}}><i className="sp-company-big"></i> </div>}
            </section>
            <div className="clientpanel_messenger">
                <div className="clientpanel_messages_header">
                    <img src={adminImage}></img>
                    <div className="clientpanel_messages_header_content">
                        <p>Administrator Martinez</p>
                        <p style={{fontSize: "13px"}}>Ostatnio online: {lastTimeActive}</p>
                    </div>
                </div>
                <div className="clientpanel_messages_container">
                    {messages.map((message, i) =>{
                        return(
                            <MemChatBox key={message.id} description={message.description} file={message.file} date={message.data}
                                        user={message.userType} filePathToDownload={message.downloadFileLink} username={message.username} />
                        )
                    })}
                </div>
                <MessengerInput admin={false}></MessengerInput>
            </div>
        </div>
    </section> :  <section className="not-found-section">
        <H1 color="white">Nie znaleźliśmy takiego projektu!</H1>
    </section>)



}
export default withRouter(ClientPanel);