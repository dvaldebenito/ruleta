import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css'

const AddContext = () => {
    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Descripción" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Button variant="primary" type="submit">
                        Submit
            </Button>
                </Form.Group>

            </Form>
        </div>
    )
}

export default AddContext