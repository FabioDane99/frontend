import moment from 'moment';
import React from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { deleteItem } from '../../api';

const CardItem = ({ id, itemData /* add all fields */, setModalOpen, createApiError }) => {



    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }

    const formatDateTime = (dateTime) => {
        return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
    }

    const formatCurrency = (currency) => {
        return currency
    }

    const onDelete = async () => {
        const res = await deleteItem(id)
        if (res.error === true) {
            createApiError({ name: res.name, message: res.message})
        }
        setModalOpen((prev) =>({...prev, show:false }));
    }


    return (
        <>
            <Card style={{
                flexDirection: 'row',
                width: "80%",
                margin: "20px auto 20px auto"
            }} bg='dark' variant="Dark" text="white" className="mb-2">

                <Card.Body>
                    <Card.Title> { `Item ${itemData.licensePlate}`}</Card.Title>
                    <hr style={{ color:'white'}}/>
                    <Card.Text> <b> Modello: </b>{ itemData.carModel }</Card.Text>
                    <Card.Text> <b> Prenotation Date: </b>{ itemData.prenotationDate}</Card.Text>
                    <Card.Text> <b> Prenotation Start Date: </b>{ itemData.prenotationStartDate}</Card.Text>
                    <Card.Text> <b> Prenotation End Date: </b>{ itemData.prenotationEndDate }</Card.Text>
                    <Card.Text> <b> Import to pay: </b>{ itemData.totalImport } $</Card.Text>
                    <Card.Text> <b> Id: </b>{ id }</Card.Text>


                    <Container className="d-flex flex-row">
                    <Button
                            size="sm"
                            style={{ marginTop: '20px', marginButton: '20px' }}
                            onClick={() => { setModalOpen({ show : true, type : 'edit', itemToUpdateId:id}) }}
                        >
                            EDIT
                        </Button>
                        <Button
                            size="sm"
                            style={{
                                backgroundColor: '#990000',
                                marginTop: '20px',
                                marginButton: '20px',
                                marginLeft: '20px',
                                borderColor: '#990000',
                            }}
                            onClick={() => onDelete()}>
                            DELETE
                        </Button>

                    </Container>
                </Card.Body>
            </Card>
        </>
    )
}

export default CardItem