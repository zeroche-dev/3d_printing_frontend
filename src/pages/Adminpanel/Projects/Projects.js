import React, { useEffect, useState } from "react";
import ProjectsTable from "../../../sections/ProjectsTable/ProjectsTable";
import {Tab, TabContent, TabItem, TabList, TabPane} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import ProjectDetails from "../../../sections/ProjectsDetails/ProjectDetails";
import AdminMessenger from "../../../sections/AdminMessenger/AdminMessenger";
import {faFacebookMessenger} from "@fortawesome/free-brands-svg-icons";
import ProjectListItem from "./ProjectListItem";
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import {useDispatch, useSelector} from "react-redux";
import {getAllMessages, getAllProjects} from "../../../redux/messages/operations";
import actions from "../../../redux/messages/actions";
const Projects = () => {

    const [openTab, setOpenTab] = useState(1);
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch();

    const messages = useSelector(state => state.messagesReducer.messages);
    const projects = useSelector(state => state.messagesReducer.projects);
    const project = useSelector(state => state.messagesReducer.projectData);

    useEffect(()=>{
        dispatch(getAllProjects());
    },[])

    const handleRow = (e) => {
        dispatch(actions.setProjectData(e));
        dispatch(getAllMessages(e.conversationKey));
    }

    const removeProjectUpdateStates = () => {
        dispatch(actions.resetProjectData());
        dispatch(actions.resetMessages());
        dispatch(getAllProjects());
    }

     return(
            <>
                <div className="projects_main_container">                    
                    <ProjectsTable theadColumns={width <= 700 ? ["Imię i nazwisko", "Status"] : ["Imię i nazwisko", "Numer telefonu", "Email", "Data", "Status"]} classNames={"projects_table_container overflow-y-auto"}>
                        {projects.map((projectx, i) =>{
                            return(
                                <tr key={projectx.id} onClick={() => handleRow(projectx)} style={{cursor: "pointer"}}>
                                    <ProjectListItem project={projectx} mobile={width <= 700}></ProjectListItem>
                                </tr> 
                            )
                        })}
                    </ProjectsTable>
                    <div className="tabs_container">
                        <Tab className="tab_padding"> 
                            <TabList color="lightBlue">
                                <TabItem
                                    onClick={(e) => {
                                        e.preventDefault();
                                         setOpenTab(1);
                                    }}
                                    ripple="light"
                                    active={openTab === 1 ? true : false}
                                    href="tabItem"
                                >
                                    <FontAwesomeIcon size={"1x"} icon={faInfoCircle}></FontAwesomeIcon>
                                    Informacje
                                </TabItem>
                                <TabItem
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    ripple="light"
                                    active={openTab === 2 ? true : false}
                                    href="tabItem"
                                >
                                    <FontAwesomeIcon size={"1x"} icon={faFacebookMessenger}></FontAwesomeIcon>
                                    Messenger
                                </TabItem>
                            </TabList>
                            <TabContent>
                                <TabPane active={openTab === 1 ? true : false}>
                                    { project.id?
                                        <ProjectDetails id={ project.id} name={ project.nameAndLastName}
                                                        phoneNumber={ project.numberPhone} date={ project.date}
                                                        email={ project.email} ipAddress={ project.ipAddress}
                                                        status={ project.orderStatus} conversationKey={ project.conversationKey} address={ project.address} updateTable={() => getAllProjects()}
                                                        removeProjectStates={() => removeProjectUpdateStates()} ></ProjectDetails>: <p> Wybierz projekt by wyświetlić informację! </p>}
                                </TabPane>
                                <TabPane active={ openTab === 2 ? true : false}>
                                    { messages.length? <AdminMessenger messages={ messages} ></AdminMessenger>:
                                    <p> Wybierz projekt by wyświetlić konwersację! </p>}
                                </TabPane>
                            </TabContent>
                        </Tab>
                    </div>
                </div>
            </>
     )
}   
export default Projects;