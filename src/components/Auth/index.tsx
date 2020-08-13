import React, { useState } from 'react'

interface propsState {
    updateAuth: (value: boolean) => void
}

const Auth = (props: propsState) => {    
    const [inputValue, setInputValue] = useState('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const registerHandler = () => {
        props.updateAuth(true)
        localStorage.setItem('login', inputValue)
        setInputValue('')
    }

    return (

        <div className="row">
            <div className="col s4 offset-s4">
                <div className="card blue darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Авторизация</span>
                                <form onSubmit={registerHandler}>
                                    <div>
                                    
                                        <div className="input-field">
                                            <input 
                                            autoFocus={true}
                                            onChange={changeHandler}
                                            value={inputValue}
                                            id="userName" 
                                            type="text"
                                            name="name"
                                            className="white-text"
                                            />
                                            <label htmlFor="first_name">Your login</label>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="card-action">
                                <button className="btn yellow darken-4" onClick={registerHandler}>Войти</button>
                            </div>
                        </div>

            </div>
        </div>
    )
}

export default Auth