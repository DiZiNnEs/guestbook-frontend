import {useEffect, useState} from "react";
import {IComments} from "../../interfaces";
import axios from "axios";

function useMessages(): { messages: IComments[], loading: boolean } {
    const [messages, setMessages] = useState<IComments[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchComments() {
        setLoading(true)
        const result = await axios.get<IComments[]>('http://localhost:8000/api/v1/comments')
        console.log(result)
        setMessages(result.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return {messages, loading}
}

export default useMessages