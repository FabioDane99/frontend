
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Form, Modal, Button, ListGroup } from 'react-bootstrap'
import { createItem, getItemById, updateItem } from '../../api';

const UpsertModal = ({ modalSetting: { show, type = 'create', itemToUpdateId }, onClose, createApiError }) => {
    const [modalTitle, setModalTitle] = useState('');

    // define state for each field
    const [carModel, setCarModel] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [prenotationEndDate, setPrenotationEndDate] = useState(moment().add(1, 'day').format('yyyy-MM-DD'));
    const [prenotationStartDate, setPrenotationStartDate] = useState(moment().format('yyyy-MM-DD'));

    const onConfirmFunction = async() => {
        return type==='create'? await create(): await update();
    }

    useEffect(() => {
        switch (type) {

            case 'create':
                /* set default enum if there is a check list */
                setCarModel('BERLINA');
                /* set modal title */
                setModalTitle('Create new item')
                /* set onConfirmFunction */

                break;
            case 'edit':
                console.log('edit')
                const updateModal = async () => {
                    let res = await getItemById(itemToUpdateId);
                    console.log('res',res)
                    if (res.error === true) {
                        createApiError(res.error);
                        return;
                    }
                    setCarModel(res.response.carModel);
                    setLicensePlate(res.response.licensePlate);
                    setPrenotationEndDate(moment(res.response.prenotationEndDate).format('yyyy-MM-DD'));
                    setPrenotationStartDate(moment(res.response.prenotationStartDate).format('yyyy-MM-DD'));

                    /* set modal title */
                    setModalTitle(`Update Item: ${itemToUpdateId}`);
                    /* set onConfirmFunction */
                }
                updateModal();
                break;
            default:
                break;
        }
    }, [])

    const create = async () => {
        const body = {
            licensePlate,
            carModel,
            prenotationEndDate,
            prenotationStartDate,
        }

        const response = await createItem(body);
        if (response.error === true) {
            console.log(response)
            createApiError(response);
            return;
        }
        alert('Item Successfully created');
        onClose()
        
        return;
    }

    const update = async () => {
        const body = {
            licensePlate,
            carModel,
            prenotationEndDate,
            prenotationStartDate,
        }
        const response = await updateItem(itemToUpdateId, body);
        if (response.error === true) {
            createApiError(response.error);
            return;
        }
        alert('Item Successfully created');
        onClose()
        
        return;
    }



    return (
        <>
            <Modal
                show={show}
                size="lg"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modalTitle}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <span> Car Model: </span>
                            <select name="carModel" onChange={(e) => setCarModel(e.target.value)} value={carModel}>
                                <option value='BERLINA'> BERLINA </option>
                                <option value='CITYCAR'> CITYCAR </option>
                                <option value='UTILITARIA'> UTILITARIA </option>
                            </select>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <span> License Plate: </span>
                            <input type="text" onChange={(e) => setLicensePlate(e.target.value)} placeholder={licensePlate ? licensePlate : "format: XX000XX"} value={licensePlate} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <span> Prenotation Start Date: </span>
                            <input type="date" onChange={(e) => setPrenotationStartDate(e.target.value)} value={prenotationStartDate} /><br /><br />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <span> Prenotation End Date: </span>
                            <input type="date" onChange={(e) => setPrenotationEndDate(e.target.value)} value={prenotationEndDate} /><br /><br />
                        </ListGroup.Item>
                    </ListGroup>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => onClose()}> Close</Button>
                    <Button variant="success" onClick={async () => await onConfirmFunction()}> Conferma</Button>
                </Modal.Footer>

            </Modal>

        </>
    )
}

export default UpsertModal