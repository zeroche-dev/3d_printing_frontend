import {Card, CardBody} from "@material-tailwind/react";
const ProjectsTable = ({children, theadColumns, classNames}) =>{
    return(
        <aside className={classNames} >
            <Card >
                <CardBody>
                    <div>
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                            <tr>
                                {theadColumns.map((column, i) =>{
                                    return(
                                        <th key={i} className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            {column}
                                        </th>
                                    )})}
                            </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

        </aside>
    )
}

export default ProjectsTable;