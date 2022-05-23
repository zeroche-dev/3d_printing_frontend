import React from "react";
import classNames from "classnames";
import {getStatusString} from '../../../Utils/UtilFunctions';

const ProjectListItem = ({project, mobile=false}) => {

    const classes = classNames("border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left", "pr-list-item--" + project.orderStatus);
    return (<>
                
                <th className={classes}> 
                    {project.nameAndLastName}
                </th>
                { !mobile && <> <th className={classes}>
                    {project.numberPhone}
                </th> 
                <th className={classes}>
                    {project.email}
                </th>
                <th className={classes}>
                    {project.date}
                </th></>}
                <th className={classes} >
                    {getStatusString(project.orderStatus)}
                </th>
    </>);

}
export default ProjectListItem;