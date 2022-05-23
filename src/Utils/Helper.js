import Cookies from "universal-cookie/es6";
import {checkToken} from "./api";
import ReactGA from "react-ga4";

class Helper {

    static regexPassword(pass) {
        return new RegExp('^(?=.*[0-9]).{6,32}$').test(pass);
    }

    static setLastTimeActive(time) {
        if (time < 1) return "mniej niż minute temu";
        else if (time > 1 && time < 60) return Math.round(time) + " minuty temu";
        else if (time >= 60 && time < 120) return "1 godzine temu";
        else if (time >= 60 && time <= (60 * 24)) return Math.round((time / 60)) + " godziny temu";
        else if (time >= 1440 && time < time(60 * 24 * 2)) return "jeden dzień temu";
        else return Math.round((time / (60 * 24))) + " dni temu";
    }

    static async checkTokenIsValid() {
        const cookies = new Cookies();

        if (cookies.get("jwt")) {
            const checkTokenResponse = await checkToken(cookies.get("jwt"));

            if (checkTokenResponse.status === "OK") return true;
        }

        return false;
    }

    static getConversationLink(projectId) {
        return "/project?projectid=" + projectId;
    }

    static API_KEY = "6Lf_ryUeAAAAABNMwtPx9XIZK2Vv3K4daOP5iGd-";

    static loadGoogleRecaptchaScript = (id) => {
        const isScriptExist = document.getElementById(id);

        if (!isScriptExist) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://www.google.com/recaptcha/api.js?render=" + this.API_KEY;
            script.id = id;
            script.onload = function () {
                console.log("Script loaded!");
            };
            document.body.appendChild(script);
        }
        if (isScriptExist) console.log("Script loaded!");
    }

    static getRecaptchaResult = () => {
        return new Promise((resolve,reject)=>{
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(this.API_KEY, { action: 'submit' }).then(token => {
                    resolve(token);
                });
            });
        });
    }

    static createEventGA4 = (category, action, label, value) => {
        ReactGA.event({
            category: category,
            action: action,
            label: label, // optional
            value: value, // optional, must be a number
        });
    }
}
export default Helper;