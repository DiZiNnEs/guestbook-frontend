import React from "react";

function ClientText(props: any) {
    return (
        <div className='h-56 grid grid-cols-3 gap-4 content-between pt-20 pl-14'>
            <div className='border-2 border-indigo-600 rounded-lg'>
                <h2><b>Имя: </b> {props.name}</h2>
                <h4><b>Текст: </b> {props.text}</h4>
            </div>
        </div>
    )
}

export default ClientText