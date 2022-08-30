import React from 'react'
import CardItem from '../CardItem'

const List = ({ itemsList, setModalOpen, createApiError }) => {
    console.log(itemsList)
    return (
        <div>
            
            {
                itemsList && itemsList.length ===0
                ? <h3> No Items Found</h3>
                : itemsList.map( item => {
                    return <CardItem key={ item._id} id={ item._id } itemData={item} createApiError={createApiError} setModalOpen={setModalOpen}></CardItem>
                })
            }
        </div>
    )
}

export default List