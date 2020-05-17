import {GET_USER} from './homeTypes.js'

const initialState = {
    username: "",
    password: ""
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state
            }
            
        default:
            return {
                ...state
            }
    }
}

export default homeReducer;