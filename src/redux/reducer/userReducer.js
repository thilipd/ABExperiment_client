import ACTIONS from "../actions";

const intialState = {
    user: {},
    token: ''
}


const articleReducer = (state = intialState, action) => {

    console.log(action)

    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        case ACTIONS.LOGOUT:
            return {
                ...intialState
            }

        default:
            return state;
    }
}
export default articleReducer