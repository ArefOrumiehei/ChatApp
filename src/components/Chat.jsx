//Icons
import { IconDotsVertical, IconPhone, IconVideo } from "@tabler/icons-react";


//Components
import Messages from "./Messages";
import Input from './Input'
import { useContext } from "react";
import { ChatContext } from "../context/ChatContextProvider";

const Chat = () => {

    const {data} = useContext(ChatContext)

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user.displayName}</span>
                <div className="chatIcons">
                    <IconVideo size={24}/>
                    <IconPhone size={24}/>
                    <IconDotsVertical size={24}/>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    );
};

export default Chat;