import React from "react";
import MemChatBox from "../../elements/ChatBox/ChatBox";
import adminImage from "../../assets/images/admin.png";
import MessengerInput from "../../elements/MessengerInput/MessengerInput";

const ProjectDetails = ({messages}) => {

    return (
        <div className="contact_form_messenger">
            <div className="contact_form_messenger_chat">
                {messages.map((message, i) => {
                    return(
                        <MemChatBox key={message.id} description={message.description} user={message.userType}
                                    file={message.file} date={message.data} filePathToDownload={message.downloadFileLink}
                                    username={message.username} adminpanel={true} icon={adminImage} />
                    )})}
            </div>

            <MessengerInput admin={true}></MessengerInput>
        </div>
    )
}

export default ProjectDetails;
