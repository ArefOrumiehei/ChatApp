import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

//Styles
import './index.css'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import ChatContextProvider from './context/ChatContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ChatContextProvider>
  </AuthContextProvider>
)
