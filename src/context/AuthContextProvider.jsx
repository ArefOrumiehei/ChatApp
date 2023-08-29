import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [currentUser , setCurrentUser] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            setCurrentUser(user)
            console.log(user);
        })
    },[])
    
    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children : PropTypes.any
}

export default AuthContextProvider;