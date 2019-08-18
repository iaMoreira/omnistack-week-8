import React , {useState} from 'react';
import logo from '../assets/logo.svg';
import './Login.css';

import api from '../services/api'
export default function Login({history}) {
    const [username, setUsername] = useState('')
    async function handleSubmit(event) {
        event.preventDefault()

        const response = await api.post('/devs', {
            username: username
        })
        console.log(response.data);
        const { _id } = response.data

        history.push(`/dev/${_id}`)
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tinder"/>
                <input placeholder="Digite seu nome de usuário"
                value={username} onChange={e => setUsername(e.target.value)}/>
                <button type="submit"> Enviar</button >
            </form>
        </div>

    );

}