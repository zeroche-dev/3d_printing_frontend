import actions from "./actions";
import * as api from "../../Utils/api";
import Helper from "../../Utils/Helper";
import Cookies from "universal-cookie/es6";

const fetchMessages = async (id) => {
    const messages = await api.getAllMessages(id);
    if(!messages.failed) {
        const json = await messages;
        return json;
    }
    return [];
}


const sendMessageRequest = async (file, message, projectid) => {

    const token = await Helper.getRecaptchaResult();

    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("description", message);
    formdata.append("projectid", projectid);
    formdata.append("captcha", token);

    const sendMessageResponse = await api.sendMessageClient(formdata);

    return sendMessageResponse.status;
}

const sendMessageRequestAsAdmin = async (file, message, projectId) => {
    const cookies = new Cookies();

    let formdata = new FormData();
    formdata.append("projectid", projectId);
    formdata.append("description", message);
    formdata.append("file", file);

    const response = await api.sendMessageAdmin(formdata, cookies.get("jwt"));
    return response.status;
}


export const getAllMessages = (id) =>
    async (dispatch) => {
       const messages = await fetchMessages(id);
       dispatch(actions.addMessages(messages));
    }


export const getProjectData = (id) =>
    async (dispatch) => {
        const response = await api.getProjectData(id);
        if(!response.failed) {
            dispatch(actions.setProjectData(response));
            Helper.createEventGA4("Clientpanel", "Visited", "visited by user: " + response.nameAndLastName);
        }
    }

export const sendMessage = (file, message, projectId) =>
    async (dispatch) => {
        dispatch(actions.changeFetchStatus(true));
        const response = await sendMessageRequest(file, message, projectId);

        if (response === "OK") {
            dispatch(getAllMessages(projectId));
        }
        dispatch(actions.changeFetchStatus(false));
    }


export const lastTimeActivity = () =>
    async (dispatch) => {
        const activities = await api.getAdminActivity();
        if(!activities.failed) {
            dispatch(actions.setLastTimeActive(Helper.setLastTimeActive(activities.lastTimeActive)));
        }
    }
export const sendMessageAsAdmin = (file, message, projectId) =>
    async (dispatch) => {
        dispatch(actions.changeFetchStatus(true));
        const response = await sendMessageRequestAsAdmin(file, message, projectId);
        if (response === "OK") {
            dispatch(getAllMessages(projectId));
        }
        dispatch(actions.changeFetchStatus(false));
    }
export const getAllProjects = () =>
    async (dispatch) => {
        const cookies = new Cookies();
        const projects = await api.getAllProjects(cookies.get("jwt"));
        dispatch(actions.setAllProjects(projects));
    }




