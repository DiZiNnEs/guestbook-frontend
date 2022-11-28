import {useEffect, useState} from "react";
import {IComments} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {apiEndpoint} from "../../cfg";

function useMessages(): { messages: IComments[], loading: boolean, error: string } {
    const [messages, setMessages] = useState<IComments[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState('')

    async function fetchComments() {
        setError('')

        try {
            setLoading(true)
            const result = await axios.get<IComments[]>(`${apiEndpoint}/api/v1/comments`)
            console.log(result)
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

    return {messages, loading, error}
}

export default useMessages