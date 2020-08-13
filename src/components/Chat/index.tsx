import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment'

interface Message {
    user: string,
    text: string,
    time: number,
    editMode: boolean,
    id: number
}


const Chat = (props: {chatId: number}) => {
    const refInput = useRef<HTMLInputElement>(null)
    const user: string = localStorage.getItem('login') || '' 
    const [messages, setMessages] = useState<Message[]>([])
    const [textInput, setTextInput] = useState('')
    const localContainerName = props.chatId ? 'chatMessages' : 'floodMessages'

    const handleDoubleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        if (e.currentTarget.firstElementChild?.nextElementSibling?.innerHTML === localStorage.getItem('login')) {
            setMessages(messages.map((m) => {
                if (m.id.toString() === e.currentTarget.dataset.id) {
                    return {
                        ...m,
                        editMode: true
                    }
                } else return m
            }))
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessages(messages.map((m) => {
            if (m.id.toString() === e.currentTarget.dataset.id) {
                return {
                    ...m,
                    text: e.currentTarget.value
                }
            } else return m
        }))
    }

    const messageSubmit = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setMessages(messages.map((m) => {
            if (m.id.toString() === e.currentTarget.dataset.id) {
                return {
                    ...m,
                    editMode: false
                }
            } else return m
        }))
        localStorage.setItem(localContainerName, JSON.stringify((
            messages.map((m) => {
            if (m.id.toString() === e.currentTarget.dataset.id) {
                return {
                    ...m,
                    editMode: false
                }
            } else return m
        }))))
    }

    const handleMessageKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setMessages(messages.map((m) => {
                if (m.id.toString() === e.currentTarget.dataset.id) {
                    return {
                        ...m,
                        editMode: false
                    }
                } else return m
            }))
            localStorage.setItem(localContainerName, JSON.stringify((
                messages.map((m) => {
                if (m.id.toString() === e.currentTarget.dataset.id) {
                    return {
                        ...m,
                        editMode: false
                    }
                } else return m
            }))))   
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
            setMessages([...messages, {user: user, text: textInput, time: Date.now(), editMode: false, id: messages.length}])
            setTextInput('')
            localStorage.setItem(localContainerName, JSON.stringify([...messages, {user, text: textInput, time: Date.now(), editMode: false, id: messages.length}]))   
    }
    const handleDelete = async (e: React.MouseEvent<HTMLSpanElement>) => {
        let id = e.currentTarget.dataset.id
            await setMessages(messages.filter((m) => m.time.toString() !== id))
            localStorage.setItem(localContainerName, JSON.stringify(messages.filter((m) => m.time.toString() !== id)))  
    }

    useEffect(() => {
            setMessages(JSON.parse(localStorage.getItem(localContainerName) + '') 
            ? JSON.parse(localStorage.getItem(localContainerName) + '') 
            : [])
            refInput.current?.focus()
    }, [localContainerName])
    
    return (
        <div className={'container'}>
            {props.chatId === 0 && (<h1>Flood</h1>)}
            {props.chatId === 1 && (<h1>Chat</h1>)}
            <div className="row msg-container">
                <ul className="collection">
                    <li className="collection-item"><strong><span>@</span>Developer</strong>: Для редактирования сообщения кликните на него 2 раза.<span></span></li>
                    {
                    messages.map((m, i) => {
                        if (!m.editMode) {
                            return (
                            <li 
                            data-id={m.id}
                            onDoubleClick={handleDoubleClick}
                            className="collection-item" 
                            key={i}>    
                                <span>@</span><strong className="blue-text darken-3">{m.user}</strong>: <span>{m.text}</span><span className="right">{moment(m.time).calendar()}</span> {
                                    m.user === localStorage.getItem('login') && (
                                        <span data-id={m.time} onClick={handleDelete} className=' delete hoverable right'>delete</span>
                                    )
                                }
                            </li>
                            )
                        } else {
                            return (
                                    <input data-id={m.id} type="text" value={m.text} autoFocus={true} onBlur={messageSubmit} onKeyDown={handleMessageKeyDown} onChange={handleMessageChange} />
                            )
                        }
                    })
                    }
                </ul>
            </div>
            <form className="bot" onSubmit={handleSubmit}>
                <input ref={refInput} type="text" placeholder={'Your message'} value={textInput} onChange={handleChange}/>
            </form>
        </div>
    );
  }
  
  export default Chat;