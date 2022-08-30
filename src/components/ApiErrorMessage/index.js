import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ApiErrorMessage = ({ error, onClose, show }) => {
    console.log('quiii', error)
    return (
        <Modal
            show={show}
            size="sm"
            style={{ border: '3px solid red'}}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
        >
            <Modal.Header style={{ backgroundColor: "#FFA07A"}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    
                    Api Error: { error.name }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    { error.message? error.message : '...' }
                </p>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#FFA07A"}}>
                <Button onClick={()=>onClose()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApiErrorMessage