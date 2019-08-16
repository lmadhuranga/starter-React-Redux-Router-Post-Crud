import { FETCH_POSTS, NEW_POST, VIEW_POST, UPDATE_POST, DELETE_POST }  from './postTypes';
import { appConfig } from '../../config/globel.conf';
const entity = 'posts';
const entityUrl = `${appConfig.app.host.url}/${entity}`;

export const fetchRecords = () => dispatch => {
    fetch(`${entityUrl}?_sort=id&_order=desc`)
    .then(res => res.json())
    .then(posts => dispatch({
        type:FETCH_POSTS,
        payload: posts
    }));
}

export const create = (formData) => dispatch => {
    fetch(`${entityUrl}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type:NEW_POST,
        payload: post
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
    .then(post => dispatch({
        type:UPDATE_POST,
        payload: post
    }));
}

export const fetchRecord = (postId) => dispatch => { 
    fetch(`${entityUrl}/${postId}`)
    .then(res => res.json())
    .then(post => dispatch({
        type: VIEW_POST,
        payload: post
    }));
}

export const deletePost = (id, formData) => dispatch => {
    return fetch(`${entityUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(post => dispatch({
        type:DELETE_POST,
        payload: "{}"
    }));
}
 