import _ from 'lodash'

import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useForm as validationUseForm, SubmitHandler} from 'react-hook-form';
import {apiEndpoint} from "../cfg";
import {FormInputType} from "../interfaces";

type Inputs = {
    username: string,
    comments: string,
};

function FormSend() {
    const [username, setUsername] = useState('')
    const [comments, setComments] = useState('')

    const [commentsError, setCommentsError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const {register, handleSubmit, watch, formState: {errors}} = validationUseForm<Inputs>();
    const onValidationSubmit: SubmitHandler<Inputs> = data => console.log('Submit handler err:', data);

    async function sendMessages() {
        console.log('err', Object.values(errors))
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

    return (
        <Form className="content-center p-4" onSubmit={handleSubmit(onValidationSubmit)}>
            <h1>{username}</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control {...register('username', {required: true, minLength: 1})} type="text" value={username}
                              onChange={(event) => {
                                  setUsername(event.target.value);
                                  setUsernameError(false)
                              }}/>
                {errors.username && <p className='text-danger'>Username is required.</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ваш текст</Form.Label>
                <Form.Control as="textarea" {...register('comments', {
                    required: true,
                    minLength: {value: 1, message: 'Length should be more 4 char'}
                })} rows={5}
                              value={comments} onChange={(event) => {
                    setComments(event.target.value);
                    setCommentsError(false)
                }}/>
                {errors.comments && <p className='text-danger'>Comments are required.</p>}
            </Form.Group>
            <input type="submit" className='col-md-4 col-md-offset-4' onClick={sendMessages}/>
            <Button as="a" variant="primary" className='col-md-4 col-md-offset-4' type='button' onClick={sendMessages}>
                Отправить
            </Button>
        </Form>
    );
}

export default FormSend;