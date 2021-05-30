import {LOGOUT, LOGIN, PLAY_GAME, INVITE_PLAYER, INVITED} from "../action_types/action_types";

const initialState = {
    email: null,
    token: null,
    username: null,
    userid: null
}

export default function (state = initialState, {payload, type = "DEFAULT"}){
    switch (type){
        case LOGIN: {
            return {
                ...state, userid: (payload?. userId) || null, token: (payload?. token) || null,
                username: (payload?. username) || null, email: (payload?. email) || null
            }
        };
        break;
        case LOGOUT: {
            return initialState;
        };
        break;
        case PLAY_GAME: {
            return {
                ...state
            }
        }
        break;
        case INVITE_PLAYER: {
            return {
                ...state
            }
        }
        break;
        case INVITED: {
            return {
                ...state
            }
        }
        break;
        default: {
            return state;
        }
    }
    // return {
    //     LOGIN: ({
    //         ...state,
    //     }),
    //     LOGOUT: ({
    //         ...initialState,
    //     }),
    //     DEFAULT: state
    // }[type || "DEFAULT"];
}
