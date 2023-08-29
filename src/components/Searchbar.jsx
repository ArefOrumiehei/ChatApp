import { useContext, useState } from "react";
import { collection, query, where , getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContextProvider'

const Searchbar = () => {

    const [username , setUserName] = useState('')
    const [user , setUser] = useState(null)
    const [error , setError] = useState(false)

    const {currentUser} = useContext(AuthContext)

    const keyHandler = (e) => {
        e.code === "Enter" && searchHandler()
    }

    const searchHandler = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setUser(doc.data())
            });
        } catch (error) {
            setError(true)
        }
    }

    const selectUserHandler = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
    
            if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
    
            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
    
            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
            }
        } catch (error) {
            setError(true)
        }
    
        setUser(null);
        setUserName("");
        };

    return (
        <div className="searchbar">
            <div className="searchForm">
                <input type="text" onChange={(e) => setUserName(e.target.value)} onKeyDown={keyHandler} value={username} placeholder="Find a user..."/>
            </div>
            {error && <span>Something went wrong!</span>}
            {user && <div className="userChat" onClick={selectUserHandler}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
};

export default Searchbar;