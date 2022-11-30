import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiEndpoint} from "../cfg";

function FormSend() {
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')

    const [usernameDirty, setUsernameDirty] = useState(false)
    const [commentDirty, setCommentDirty] = useState(false)

    const [usernameError, setUsernameError] = useState('Имя пользователя не может быть пустым')
    const [commentError, setCommentError] = useState('Комментарий не может быть пустым')

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (usernameError || commentError)
            setFormValid(false)
        else
            setFormValid(true)
    }, [usernameError, commentError])

    async function sendMessages() {
        const response = await axios.post(`${apiEndpoint}/api/v1/comments`, {
            username: username,
            comments: comment
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        if (response.status === 200) {
            console.log('Данные успешно добавлены')
            setComment('')
        } else {
            console.log('Данные не были добавлены')
        }
    }

    function blurHandler(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        console.log(e)
        switch (e.target.name) {
            case 'username':
                setUsernameDirty(true)
                break
            case 'comment':
                setCommentDirty(true)
                break
            default:
                break
        }
    }

    function usernameHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUsername(e.target.value)
        const testUsername = e.target.value.match(/^[A-Za-z0-9_/\s]*$/)
        const testUsernameHyperLink = e.target.value.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)

        if (!testUsername || testUsernameHyperLink) {
            setUsernameError('Допустимо: латинские буквы, цифры, знак нижнего подчеркивания')
        } else if (!e.target.value) {
            setUsernameError('Имя пользователя не может быть пустым')
        } else {
            setUsernameError('')
        }
    }

    function commentHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setComment(e.target.value)
        const testComment = e.target.value.match(/^[A-Za-z0-9_/\s]*$/)

        if (!testComment) {
            setCommentError('Допустимо только латинские буквы, цифры, знак нижнего подчеркивания')
        } else if (!e.target.value) {
            setCommentError('Комментарий не может быть пустым')
        } else {
            setCommentError('')
        }
    }

    return (
        <Form className="content-center p-4">
            <h1>{username}</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control type="text" name='username' value={username} onBlur={e => blurHandler(e)}
                              onChange={(event) => {
                                  usernameHandler(event)
                              }}/>
                {(usernameDirty && usernameError) && <p className='text-danger'>{usernameError}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ваш комментарий</Form.Label>
                <Form.Control as="textarea" name='comment' rows={5}
                              onBlur={e => blurHandler(e)}
                              value={comment} onChange={(event) => {
                    commentHandler(event)
                }}/>
                {(commentDirty && commentError) && <p className='text-danger'>{commentError}</p>}
            </Form.Group>
            <Button disabled={!formValid} variant="primary" className='col-md-4 col-md-offset-4' type='button'
                    onClick={sendMessages}>
                Отправить
            </Button>
        </Form>
    );
}

export default FormSend;