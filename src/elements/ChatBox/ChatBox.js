import React, {memo, useRef} from "react";
import adminImage from "../../assets/images/admin.jpg";
import {Popover, PopoverContainer} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileDownload} from "@fortawesome/free-solid-svg-icons";

const ChatBox = ({description, user, date, file, filePathToDownload, username, icon, adminpanel, adminName}) =>{

    const buttonRef = useRef();

    ChatBox.defaultProps = {
        icon: adminImage,
        adminpanel: false,
        adminName: "Administrator Martinez Soo"
    };

    const filePosition ={
        float: "right"
    }

    const chatBoxPosition ={
        justifyContent: "flex-end"
    }

    const adminBackgroundColor ={
        background: "#3e4042"
    }

    const userBackgroundColor ={
        background: "#0084ff"
    }

    const Image =  () => {
        if((user !== "USER") && !adminpanel || (user === "USER" && adminpanel))
            return (<div>
                <img src={icon}></img>
            </div> )
        else return (<> </>)
    }

return(
    <div className="chat_box_container" style={(user == "USER" && !adminpanel) || (user !== "USER" && adminpanel) ? chatBoxPosition: null}>

        <Image></Image>

        <div className="chat_box_" style={user == "USER"? userBackgroundColor: adminBackgroundColor} ref={buttonRef}>
            <p><strong>{user !== "USER"? adminName: username}</strong></p>
            <p>{description}</p>

            {file?<a href={filePathToDownload}  style={filePosition} target="_blank"> <FontAwesomeIcon icon={faFileDownload} size="1x" color="white"></FontAwesomeIcon> {file}</a>: ""}
        </div>

        <Popover placement="top"  ref={buttonRef}>
            <PopoverContainer className="chat_box_date">
                <p>{date}</p>
            </PopoverContainer>
        </Popover>
    </div>
)
}

const MemChatBox = memo(ChatBox);

export default MemChatBox;
