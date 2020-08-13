import React, { useState } from 'react';

interface PropsState {
    updateChatId: (value: number) => void
    updateAuth: (value: boolean) => void
    isAuth: boolean
}

const Header = (props: PropsState) => {

    let [btnClasses, setBtnClasses] = useState({floodBtn: 'btn disabled', chatBtn: 'btn'})

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.updateChatId(0)
        setBtnClasses({chatBtn: 'btn', floodBtn: 'btn disabled'})
    }

    const handleClick1 = () => {
        props.updateChatId(1)
        setBtnClasses({floodBtn: 'btn', chatBtn: 'btn disabled'})

    }

    const handleLogOut = () => {
        localStorage.removeItem('login')
        props.updateAuth(false)
    }

    return (
        
      <header className={'header'}>
        <nav>
            <div className="nav-wrapper row valign-wrapper blue darken-1">
                <span className="col offset-s1 s1 brand-logo">Logo</span>

                {
                    props.isAuth && (
                        <ul id="nav-mobile" className="col offset-s5 s2 hide-on-med-and-down chats">
                            <li><button onClick={handleClick} className={btnClasses.floodBtn}>flood</button></li>
                            <li><button onClick={handleClick1} className={btnClasses.chatBtn}>chat</button></li>
                        </ul>
                    )
                }
                { 
                    props.isAuth && (
                        <button onClick={handleLogOut} className="btn col offset-s3 red darken-1">Выйти</button>
                    )
                }

            </div>
        </nav>
      </header>
    );
  }
  
  export default Header;