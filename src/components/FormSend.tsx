import Form from 'react-bootstrap/Form';

function FormSend() {
    return (
        <Form className="col-md-4 col-md-offset-4">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Ваш текст</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </Form>
    );
}

export default FormSend;