import types from "./types";

const INITIAL_STATE = {
    messages: [],
    fetch: false,
    lastTimeActive: "",
    projectData: [],
    projects: []
}

function messagesReducer(state = INITIAL_STATE, action){
    switch (action.type){
        case types.ADD_MESSAGE:
            return {...state, messages: action.items};
        case types.RESET_MESSAGES:
            return {...state, messages: []};
        case types.CHANGE_FETCH_STATUS:
            return {...state, fetch: action.status};
        case types.SET_LAST_TIME_ACTIVE:
            return {...state, lastTimeActive: action.item};
        case types.SET_PROJECT_DATA:
            return {...state, projectData: action.item};
        case types.SET_ALL_PROJECTS:
            return {...state, projects: action.items};
        case types.RESET_PROJECT_DATA:
            return {...state, projectData: []};
        default:
            return state;
    }
}

export default messagesReducer;
