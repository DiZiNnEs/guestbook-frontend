import React, {useEffect, useState} from "react";
import {IComments} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {apiEndpoint} from "../../cfg";

function useMessages(): { messages: IComments[], setMessages: React.Dispatch<React.SetStateAction<IComments[]>>, loading: boolean, error: string } {
    const [messages, setMessages] = useState<IComments[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState('')

    async function fetchComments() {
        setError('')

        try {
            setLoading(true)
            const result = await axios.get<IComments[]>(`${apiEndpoint}/api/v1/comments`)
            setMessages(result.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return {messages, setMessages, loading, error}
}

export default useMessages