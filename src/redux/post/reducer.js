import { FETCH_POSTS, NEW_POST, VIEW_POST, UPDATE_POST,DELETE_POST }  from './types';

const initialSate = {
    items: [],
    item: {}
}

export default function(state = initialSate, action) {
    // console.log('action',action.type ,action.payload);
    // console.log('initialSate',initialSate);
    switch(action.type) {
        case FETCH_POSTS: 
            return {
                ...state,
                items: action.payload
            }
        case NEW_POST: 
            return {
                ...state,
                item: action.payload
            }
        case UPDATE_POST: 
            return {
                ...state,
                item: action.payload
            }
        case VIEW_POST: 
            return {
                ...state,
                item: action.payload
            }
        case DELETE_POST: 
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}