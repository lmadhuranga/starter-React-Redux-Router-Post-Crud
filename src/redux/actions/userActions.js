import { FETCH_USERS, NEW_USER, VIEW_USER, UPDATE_USER, DELETE_USER }  from './userTypes';
import { appConfig } from '../../config/globel.conf';
const entity = 'users';
const entityUrl = `${appConfig.app.host.url}/${entity}`;

export const fetchRecords = () => dispatch => {
    fetch(`${entityUrl}?_sort=id&_order=desc`)
    .then(res => res.json())
    .then(users => dispatch({
        type:FETCH_USERS,
        payload: users
    }));
}

export const create = (formData) => dispatch => {
    delete formData['id']; 
    fetch(`${entityUrl}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json() )
    .then(user => dispatch({
        type:NEW_USER,
        payload: user
    })); 
}

export const update = (id, formData) => dispatch => {
    return fetch(`${entityUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(user => dispatch({
        type:UPDATE_USER,
        payload: user
    }));
}

export const fetchRecord = (userId) => dispatch => { 
    fetch(`${entityUrl}/${userId}`)
    .then(res => res.json())
    .then(user => dispatch({
        type: VIEW_USER,
        payload: user
    }));
}

export const deleteUser = (id, formData) => dispatch => {
    return fetch(`${entityUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(user => dispatch({
        type:DELETE_USER,
        payload: "{}"
    }));
}
 