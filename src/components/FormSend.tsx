import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React from "react";
import Snackbar from "./tools/Snackbar";
import useForm from "./hooks/useForm";

function FormSend(props: any) {
    const {
        username,
        comment,
        usernameDirty,
        commentDirty,
        usernameError,
        commentError,
        formValid,
        isSnackbarShown,
        blurHandler,
        usernameHandler,
        commentHandler,
        sendMessages
    } = useForm(props)


    return (
        <Form className="content-center p-4 text-center">
            <h1>{username}</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='col-sm-2 col-form-label col-form-label-lg'>Ваше имя</Form.Label>
                <Form.Control type="text" name='username' value={username} onBlur={e => blurHandler(e)}
                              onChange={(event) => {
                                  usernameHandler(event)
                              }}/>
                {(usernameDirty && usernameError) && <p className='text-danger'>{usernameError}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className='col-sm-2 col-form-label col-form-label-lg'>Ваш комментарий</Form.Label>
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
            <Snackbar name={'Загрузка...'} show={isSnackbarShown}/>
        </Form>
    );
}

export default FormSend;