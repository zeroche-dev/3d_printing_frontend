import React, {useEffect} from 'react'
import Dashboard from "./Dashboard/Dashboard";
import Projects from "./Projects/Projects";
import GalleryManagement from "./GalleryManagement/GalleryManagement";
import Helper from "../../Utils/Helper";
import {useHistory} from "react-router-dom";

const AdminPanel = (props) => {

    const components = {
        Dashboard,
        Projects,
        GalleryManagement
    }

    let history = useHistory();

    useEffect(() => {
        Helper.checkTokenIsValid().then((bool) => {
            if(!bool) history.push("/login");
        });
    }, [components])

    const SpecificPage = components[props.page];

    return (<>
        <SpecificPage history={props.history}/>
    </>);
}
export default AdminPanel;