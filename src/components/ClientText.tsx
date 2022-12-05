import React from "react";

import Row from 'react-bootstrap/Row';
import Grid from 'react-bootstrap/Col';
import {IComments} from "../interfaces";

function ClientText(props: {name: string, text: string}) {
    return (
        <div>
            <Grid>
                <div className='mt-20'>
                <Row className="text-center"><h3>Имя: {props.name}</h3></Row>
                <Row className="text-center"><h5>Комментарий: {props.text}</h5></Row>
                </div>
            </Grid>
        </div>
    )
}

export default ClientText