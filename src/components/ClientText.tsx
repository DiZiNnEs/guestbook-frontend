import React from "react";

function ClientText(props: any) {
    return (
        <div>
            <h2>{props.name}</h2>
            <h4>{props.text}</h4>
        </div>
    )
}

export default ClientText