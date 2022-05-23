const serverUrl = "http://157.230.104.23/printapp";

const get = (url, headersOptions) =>
    new Promise((resolve, reject) => {
        fetch(url, headersOptions)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => {resolve({failed: true})})
    })

const request = (url, method, body, headers) =>
    new Promise((resolve, reject) =>{
        fetch(url, {method: method,
            headers: headers,
            body: body})
            .then(response =>{
                if(response.ok) return response.json();
                else throw response.json();})
            .then(json => resolve(json))
            .catch(error => {error.then(response => resolve(response))})
    })

const blobRequest = (url, method, headers ) =>
    new Promise((resolve, reject) =>{
        fetch(url, {method: method,
            headers: headers})
            .then(response =>{
                if(response.ok) return response.blob();
                else throw response.json();})
            .then(blob => resolve(URL.createObjectURL(blob)))
            .catch(error => console.log(error))
    })

export const getAllMessages = (id) =>
    get(serverUrl + "/project/conversation?projectid=" + id, {method: 'GET', redirect: 'follow'});
    
export const getProjectData = (id) =>
    get(serverUrl + "/project/data?projectid=" + id, {method: 'GET',"Content-Type": "application/json"});

export const getAdminActivity = () =>
    get(serverUrl + "/activity",  {method: 'GET', redirect: 'follow'});

export const adminLoginRequest = (username, password, captcha) =>
    request(serverUrl + "/login", "POST", JSON.stringify({"username": username, "password": password, "captchaResponse": captcha}), {"Content-Type": "application/json"});

export const sendMessageClient = (body) =>
    request(serverUrl + "/send/response", "POST", body, {"Accept": "application/json"});

export const sendMessageAdmin = (body, jwt) =>
    request(serverUrl + "/admin/send/response", "POST", body, {"Authorization": jwt});

export const changeProjectStatus = (id, status, jwt) =>
    request(serverUrl + "/change/project/status", "PUT", JSON.stringify({"newStatus": status, "projectId": id}), {"Content-Type": "application/json", "Authorization": jwt});

export const removeProject = (projectId, jwt) =>
    request(serverUrl + "/remove/project?projectid=" + projectId, "DELETE", {}, {"Authorization": jwt});

export const createProject = (body) =>
    request(serverUrl + "/create/project", "POST", body, {"Accept": "application/json"})

export const getAllProjects = (jwt) =>
    get(serverUrl + "/projects/list", {method: 'GET', headers: {"Authorization": jwt}});

export const changePassword = (password, newPassword, jwt) =>
    request(serverUrl + "/change/password", "PUT",
        JSON.stringify({"password": password, "newPassword": newPassword}), {"Content-Type": "application/json", "Authorization": jwt});

export const getImageBlob = (imageId) =>
    blobRequest(serverUrl + "/image?imageid=" + imageId, "GET", {});

export const getAllImages = () =>
    get(serverUrl + "/images", {});

export const checkToken = (jwt) =>
    get(serverUrl + "/token/valid", {headers:  {"Authorization": jwt}});

export const sendImage = (body, jwt) =>
    request(serverUrl + "/image/add", "POST", body, {"Authorization": jwt})

export const deleteImage = (imageId, jwt) =>
    request(serverUrl + "/image/delete?imageid=" + imageId, "DELETE", {}, {"Authorization": jwt})

export const updateImage = (body, jwt) =>
    request(serverUrl + "/image/update", "POST", body, {"Authorization": jwt})

export const checkSmtpIsWorking = (jwt) =>
    get(serverUrl + "/check/smtp", {headers:  {"Authorization": jwt}})

export const getSmtpConfiguration = (jwt) =>
    get(serverUrl + "/configuration", {headers:  {"Authorization": jwt}})

export const smtpUpdateConfiguration = (jwt, email, password, enabled) =>
    request(serverUrl + "/configuration/update", "POST",
        JSON.stringify({"email": email, "password": password, "enabled": enabled}), {"Content-Type": "application/json", "Authorization": jwt})



