import {Button, Spinner} from "react-bootstrap";
import {Fragment, useEffect, useState} from "react";

interface IProps {
    name: string
    show: boolean
}

function Snackbar({name, show}: IProps) {
    return (
        show ? <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            {name}
        </Button> : <Fragment/>
    )
}

export default Snackbar