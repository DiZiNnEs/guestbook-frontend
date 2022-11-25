import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

function FormSend() {
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    async function sendMessages() {
        const response = await axios.post('http://localhost:8000/api/v1/comments', {
            username: name,
            comments: text
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
    }

    return (
        <Form className="col-md-4 col-md-offset-4">
            <h1>{name}</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ваш текст</Form.Label>
                <Form.Control as="textarea" rows={5} value={text} onChange={(event) => setText(event.target.value)}/>
            </Form.Group>
            <Button as="a" variant="primary" className='col-md-4 col-md-offset-4' onClick={sendMessages}>
                Отправить
            </Button>
        </Form>
    );
}

export default FormSend;