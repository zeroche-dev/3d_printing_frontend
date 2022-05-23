import React, {useRef, useState} from "react";
import {Input, Label} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, sendMessageAsAdmin} from "../../redux/messages/operations";
import Helper from "../../Utils/Helper";

const MessengerInput = ({admin}) =>{

    const dispatch = useDispatch();
    const fetch = useSelector(state => state.messagesReducer.fetch);
    const projectData = useSelector(state => state.messagesReducer.projectData);

    const sizeSendIcon = {fontSize: "44px"}
    const hiddenFileInput = useRef(null);
    const [filePath, setFilePath] = useState();
    const [newMessage, setNewMessage] = useState("");

    const sendData = () =>{
        if(!fetch){
            if(!admin){
                dispatch(sendMessage(filePath, newMessage, projectData.conversationKey));
                Helper.createEventGA4("Clientpanel", "send_message", "message was send by user: " + projectData.nameAndLastName);
                setFilePath(undefined);
                setNewMessage("");
            }else{
                dispatch(sendMessageAsAdmin(filePath, newMessage, projectData.conversationKey));
                setFilePath(undefined);
                setNewMessage("");
            }
        }
    }

    return(
        <div>
            <div className={!admin? "messenger_input_container input_white_font": "messenger_input_container"}>

                {filePath !== undefined? <Label color="lightBlue">{filePath.name}</Label>: <> </>}
                <div className="messenger_inputs">
                    <FontAwesomeIcon icon={faPlus} size="3x" onClick={() => hiddenFileInput.current.click()} color="#0084ff"></FontAwesomeIcon>
                    <input type="file" name="file" style={{display:'none'}}
                           onChange={e => setFilePath(e.target.files[0])} ref={hiddenFileInput}></input>

                    <Input
                        type="text"
                        color="lightBlue"
                        size="lg"
                        outline={true}
                        placeholder="Aa"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    {!fetch? <FontAwesomeIcon onClick={sendData} icon={faPaperPlane} style={sizeSendIcon} color="#0084ff" ></FontAwesomeIcon>:
                        <i className='sp-white'></i>}

                </div>


            </div>
        </div>
    )
}

export default MessengerInput;