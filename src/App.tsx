import React, {useEffect, useState} from 'react';
import {Badge, Stack, Button} from "react-bootstrap";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormSend from "./components/FormSend";
import ClientText from "./components/ClientText";
import axios from "axios";
import {IComments} from "./interfaces";

function App() {
    const [messages, setMessages] = useState([])


    async function fetchComments() {
        const result = await axios.get<IComments[]>('http://localhost:8000/api/v1/comments')
        setMessages(result.data)
    }

    useEffect(() => {

    })

    return (
        <div>
            <div className="App mx-auto max-w-6xl pt-5 position-relative left-1/5">
                <FormSend/>
                <Button as="a" variant="primary" className='col-md-4 col-md-offset-4'>
                    Отправить
                </Button>
            </div>

            <ClientText name='Андрей' text='Hello, Andrei'></ClientText>
        </div>
    );
}

export default App;
