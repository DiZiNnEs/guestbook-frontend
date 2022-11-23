import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Badge, Stack, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextControlsExample from "./services/TextControlsExample";

function App() {
    return (
        <div className="App">
            <TextControlsExample />
            <Button as="a" variant="primary" className='col-md-4 col-md-offset-4'>
                Отправить
            </Button>
        </div>
    );
}

export default App;
