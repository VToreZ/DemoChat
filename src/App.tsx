import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Auth from './components/Auth';
import Header from './components/Header';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('login'))
  const [chatId, setChatId] = useState(0)
  const updateAuth = (value: boolean) => {
    setIsAuth(value)
  }
  const updateChatId = (value: number) => {
    setChatId(value)
  }

  return (
    <div className="App">
      <Header updateAuth={updateAuth} updateChatId={updateChatId} isAuth={isAuth}/>
        {
          !isAuth && (<Auth updateAuth={updateAuth}/>)
        }
        {
          isAuth && (<Chat chatId={chatId}/>)
        }
    </div>
  );
}

export default App;
