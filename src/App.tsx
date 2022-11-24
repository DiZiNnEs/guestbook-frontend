import React, {useState} from 'react';
import {Badge, Stack, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextControlsExample from "./services/TextControlsExample";

function App() {
    const [count, setCount] = useState(0)
    return (
        <div className="App">
            <h1>Hello {count}</h1>
            <TextControlsExample />
            <Button as="a" variant="primary" className='col-md-4 col-md-offset-4' onClick={() => setCount(count + 1)}>
                Отправить
            </Button>
        </div>
    );
}

export default App;
