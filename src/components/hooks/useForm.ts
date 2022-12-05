import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiEndpoint} from "../../cfg";
import {IComments} from "../../interfaces";

function useForm(props: { parentCallback: (childData: IComments) => void; }) {
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')

    const [usernameDirty, setUsernameDirty] = useState(false)
    const [commentDirty, setCommentDirty] = useState(false)

    const [usernameError, setUsernameError] = useState('Имя пользователя не может быть пустым')
    const [commentError, setCommentError] = useState('Комментарий не может быть пустым')

    const [isSnackbarShown, setIsSnackbarShown] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('Загрузка...')

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (usernameError || commentError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }

    }, [usernameError, commentError, isFormValid])

    async function sendMessages() {
        setIsSnackbarShown(true)
        if (isFormValid) {
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
                setComment('')
                props.parentCallback(response.data);
            } else {
                setSnackbarMessage('Не удалось загрузить комментарий')
            }
        }

        setIsSnackbarShown(false)
    }

    function blurHandler(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

    const keydownHandler = async (e: KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) await sendMessages()
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
    }, [keydownHandler]);



    return {username, comment, usernameDirty, commentDirty, usernameError, commentError, formValid: isFormValid, isSnackbarShown, snackbarMessage, blurHandler, usernameHandler, commentHandler, sendMessages}
}

export default useForm