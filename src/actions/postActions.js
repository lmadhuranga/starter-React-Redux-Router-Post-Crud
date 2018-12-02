import { FETCH_POSTS, NEW_POST, VIEW_POST }  from './types';

export const fetchPosts = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => dispatch({
        type:FETCH_POSTS,
        payload: posts
    }));
}
export const createPost = (postData) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(FormData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type:NEW_POST,
        payload: post
    }));
}

export const fetchPost = (postId) => dispatch => {
    console.log('postId',postId);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(post => dispatch({
        type: VIEW_POST,
        payload: post
    }));
}
