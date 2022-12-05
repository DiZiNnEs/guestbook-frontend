import React from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormSend from "./components/FormSend";
import ClientText from "./components/ClientText";
import useMessages from "./components/hooks/useMessages";
import {IComments} from "./interfaces";

function App() {

    const {messages, setMessages, loading, error} = useMessages()

    function updateMessages(childData: any) {
        setMessages((oldMessages) => [childData, ...oldMessages]);
    }

    return (
        <div>
            <div className="App mx-auto max-w-6xl pt-5 position-relative left-1/5">
                <FormSend parentCallback={updateMessages}/>
            </div>
            {loading && <h2 className='text-center'>Loading...</h2>}
            {error && <h2 className='text-center text-danger'>{error}</h2>}
            {messages.map((msg: IComments, i: number) => <ClientText name={msg.username} text={msg.text} key={i}/>)}
        </div>
    );
}

export default App;
