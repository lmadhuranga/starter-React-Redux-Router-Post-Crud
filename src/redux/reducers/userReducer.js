import { FETCH_USERS, NEW_USER, VIEW_USER, UPDATE_USER,DELETE_USER }  from '../actions/userTypes';

const initialSate = {
    items: [],
    item: {}
}

export default function(state = initialSate, action) {
    // console.log('action',action.type ,action.payload);
    // console.log('initialSate',initialSate);
    switch(action.type) {
        case FETCH_USERS: 
            return {
                ...state,
                items: action.payload
            }
        case NEW_USER: 
            return {
                ...state,
                item: action.payload
            }
        case UPDATE_USER: 
            return {
                ...state,
                item: action.payload
            }
        case VIEW_USER: 
            return {
                ...state,
                item: action.payload
            }
        case DELETE_USER: 
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}