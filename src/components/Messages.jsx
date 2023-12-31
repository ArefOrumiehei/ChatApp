import { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

//Contexts
import { ChatContext } from '../context/ChatContextProvider';

//Components
import Message from './Message'


const Messages = () => {

    const [messages , setMessages] = useState([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className="messages">
            {messages.map((message) => (
                <Message message={message} key={message.id}/>
            ))}
        </div>
    );
};

export default Messages;