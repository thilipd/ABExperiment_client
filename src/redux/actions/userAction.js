import ACTIONS from "./index";



export const dispatchLogin = (res) => {

    return {
        type: ACTIONS.LOGIN,
        payload: {
            user: res.user,
            token: res.accessToken

        }
    }

}

export const dispatchLogout = () => {

    return {
        type: ACTIONS.LOGOUT

    }

}