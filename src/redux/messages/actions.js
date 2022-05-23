import types from "./types";

const addMessages = items => ({
    type: types.ADD_MESSAGE, items
})

const resetMessages = item => ({
    type: types.RESET_MESSAGES, item
})

const changeFetchStatus = status => ({
    type: types.CHANGE_FETCH_STATUS, status
})

const setLastTimeActive = item => ({
    type: types.SET_LAST_TIME_ACTIVE, item
})

const setProjectData = item => ({
    type: types.SET_PROJECT_DATA, item
})

const setAllProjects = items => ({
    type: types.SET_ALL_PROJECTS, items
})

const resetProjectData = item => ({
    type: types.RESET_PROJECT_DATA, item
})


export default {
    addMessages, resetMessages, changeFetchStatus, setLastTimeActive,
    setProjectData, setAllProjects, resetProjectData
}
