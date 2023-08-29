//Icons
import { useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 } from "uuid";

//Icons
import { IconPaperclip, IconPhoto, IconSend } from "@tabler/icons-react";

//Contexts
import { AuthContext } from "../context/AuthContextProvider";
import { ChatContext } from "../context/ChatContextProvider";


const Input = () => {

    const [text , setText] = useState('')
    const [img , setImg] = useState(null)
    
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const sendHandler = async () => {
        if (img) {
            const storageRef = ref(storage, v4());
    
            const uploadTask = uploadBytesResumable(storageRef, img);
    
            uploadTask.on(
                (error) => {
                    console.log(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: v4(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        }),
                    });
                });
            }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: v4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
    
        setText("");
        setImg(null);
    };

    return (
        <div className="input">
            <input type="text" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} />
            <div className="send">
                <IconPaperclip/>
                <label htmlFor="file">
                    <input type="file" id="file" style={{display:'none'}} onChange={(e) => setImg(e.target.files[0])} />
                    <IconPhoto/>
                </label>
                <button className="sendBtn" onClick={sendHandler}><IconSend/></button>
            </div>
        </div>
    );
};

export default Input;