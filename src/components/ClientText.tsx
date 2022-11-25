import React from "react";

function ClientText(props: any) {
    return (
        <div className='mx-auto max-w-6xl pt-5 position-relative left-1/5'>
            <h2>{props.name}</h2>
            <h4>{props.text}</h4>
        </div>
    )
}

export default ClientText