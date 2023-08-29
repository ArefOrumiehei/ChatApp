import { useContext, useEffect, useRef } from "react";
import PropTypes from 'prop-types'

//Contexts
import { AuthContext } from "../context/AuthContextProvider";
import { ChatContext } from "../context/ChatContextProvider";


const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior : 'smooth'})
    }, [message])

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ?
                    currentUser.photoURL 
                    :
                    data.user.photoURL
            
                } alt="" />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

Message.propTypes = {
    message : PropTypes.any
}

export default Message;