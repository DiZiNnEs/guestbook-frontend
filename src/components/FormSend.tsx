import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {apiEndpoint} from "../cfg";
import _ from 'lodash'

function FormSend() {
    const [username, setUsername] = useState('')
    const [comments, setComments] = useState('')
    const [formErrors, setFormErrors] = useState({})

    async function sendMessages() {
        const response = await axios.post(`${apiEndpoint}/api/v1/comments`, {
            username: username,
            comments: comments
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
    }

    async function handleValidation() {
        let errors: Record<string, any> = {}
        let isValidForm = true

        if (_.isEmpty(username)) {
            isValidForm = false
            errors['username'] = `Username shouldn't be a empty`
        }

        if (_.isEmpty(comments)) {
            isValidForm = false
            errors['comments'] = `Comments`
        }
    }

    return (
        <Form className="content-center">
            <h1>{username}</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ваш текст</Form.Label>
                <Form.Control as="textarea" rows={5} value={comments} onChange={(event) => setComments(event.target.value)}/>
            </Form.Group>
            <Button as="a" variant="primary" className='col-md-4 col-md-offset-4' type='button' onClick={sendMessages}>
                Отправить
            </Button>
        </Form>
    );
}

export default FormSend;