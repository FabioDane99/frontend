
const BASE_URL = "http://localhost:7000"

const ENTITY_NAME = "prenotations"

const handleError = async (response, id = null) => {
    const code = response.status;
    const body = await response.json();
    console.log(body, code)
    let result = {}
    switch (code) {
        case 200:
            result = { error: false, response: body }
            break;
        case 400:
            result = { error: true, name: 'Bad Request', message: body.message}
            break;
        case 404:
            result = { error: true, name: 'Not Found', message: `${ENTITY_NAME} ${id ? 'with id:' + id : ''} not found...` }
            break;
        default:
            result = { error: true, name: 'Internal Error', message: 'Some error occure please try later...' }
            break;
    }
    return result;
}

export const deleteItem = async (id) => {
    return  fetch(`${BASE_URL}/${ENTITY_NAME}/${id}`, { method: "DELETE" })
        .then(async data => {
            console.log(data)
            return handleError(data, id);
        })
        .catch(err => {
            console.log(err);
            return { error: true, name: 'Internal Error', message: 'Some error occure please try later' }
        });
}

export function getAllItems() {
    return fetch(`${BASE_URL}/${ENTITY_NAME}`, { method: 'GET' })
        .then(async (data) => {
            console.log(data);
            
            return handleError(data);
        })
        .catch(err => {
            console.log(err);
            return { error: true, name: 'Internal Error', message: 'Some error occure please try later' };
        });
}

export  function getItemById(id) {
    return  fetch(`${BASE_URL}/${ENTITY_NAME}/${id}`, { method: "GET" })
        .then(async (data) => {
            return handleError(data, id);
        })
        .catch(err => {
            console.log(err);
            return { error: true, name: 'Internal Error', message: 'Some error occure please try later' };
        });
}

export  function createItem(body) {
    return  fetch(`${BASE_URL}/${ENTITY_NAME}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...body })
    }).then(async (data) => {
        return handleError(data);
    })
        .catch(err => {
            console.log(err);
            return { error: true, name: 'Internal Error', message: 'Some error occure please try later' };
        });
}

export function updateItem(id, body) {
    return fetch(`${BASE_URL}/${ENTITY_NAME}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...body })
    }).then(async (data) => {

        return handleError(data, id);
    })
        .catch(err => {
            console.log(err);
            return { error: true, name: 'Internal Error', message: 'Some error occure please try later' };
        });
}











