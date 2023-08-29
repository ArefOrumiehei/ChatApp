import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types'

//Contexts
import { AuthContext } from './AuthContextProvider';

export const ChatContext = createContext()

const ChatContextProvider = ({children}) => {

    const { currentUser } = useContext(AuthContext)

    const INITIAL_STATE = {
        chatId : 'null',
        user : {},
    }

    const chatReducer = (state,action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user : action.payload,
                    chatId : 
                    currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                }
                
        
            default:
                return state;
        }
    }
    
    const [state , dispatch] = useReducer(chatReducer , INITIAL_STATE)
    
    return (
        <ChatContext.Provider value={{data:state , dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};

ChatContextProvider.propTypes = {
    children : PropTypes.any
}

export default ChatContextProvider;