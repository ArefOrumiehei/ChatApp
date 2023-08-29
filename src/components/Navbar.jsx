import { useContext } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

//Contexts
import { AuthContext } from '../context/AuthContextProvider'

const Navbar = () => {

    const {currentUser} = useContext(AuthContext)

    return (
        <div className="navbar">
            <span className="logo">Aref Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt={`${currentUser.displayName} profile`} />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;