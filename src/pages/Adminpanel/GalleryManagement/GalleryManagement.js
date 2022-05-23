import React from "react";
import {getAllImages} from "../../../Utils/api";
import ProjectsTable from "../../../sections/ProjectsTable/ProjectsTable";
import {Tab, TabContent, TabItem, TabList, TabPane} from "@material-tailwind/react";
import {faImages, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddImageForm from "../../../sections/AddImageForm/AddImageForm";
import EditImageForm from "../../../sections/EditImageForm/EditImageForm";
import Cookies from "universal-cookie/es6";
import * as api from "../../../Utils/api";

class GalleryManagement extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            image: undefined,
            openTab: 1
        }
    }
    async componentDidMount() {
        const images = await getAllImages();
        this.setState({images});
    }
    handleRow(image){
        this.setState({image});
    }
    refreshImagesList = async () => {
        const images = await getAllImages();
        this.setState({images});
    }
    deleteImage = async () => {
        const cookies = new Cookies();

        const deleteResponse = await api.deleteImage(this.state.image.id, cookies.get("jwt"));

        if (deleteResponse.status === "OK") {
            const images = await getAllImages();
            this.setState({images: images, image: undefined});
        }
    }
    render()
    {
        return(<>
            <div className="projects_main_container">

            <ProjectsTable theadColumns={["Tytuł", "Data"]} classNames="projects_table_container overflow-y-auto">
                {this.state.images.map((image, i) => {
                    return(
                        <tr key={image.id} onClick={() => this.handleRow(image)}>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                {image.title}
                            </th>
                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                {image.date}
                            </th>
                        </tr>
                    )})}
            </ProjectsTable>


            <div className="tabs_container">
                <Tab>
                    <TabList color="lightBlue">
                        <TabItem
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({openTab: 1})
                            }}
                            ripple="light"
                            active={this.state.openTab === 1 ? true : false}
                            href="tabItem"
                        >
                            <FontAwesomeIcon size={"1x"} icon={faImages}></FontAwesomeIcon>
                            Image details
                        </TabItem>
                        <TabItem
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({openTab: 2})
                            }}
                            ripple="light"
                            active={this.state.openTab === 2 ? true : false}
                            href="tabItem"
                        >
                            <FontAwesomeIcon size={"1x"} icon={faPlus}></FontAwesomeIcon>
                            Add image
                        </TabItem>
                    </TabList>

                    <TabContent>
                        <TabPane active={this.state.openTab === 1 ? true : false}>
                            {this.state.image !== undefined ? <EditImageForm classNames={"add_new_image_container"} id={this.state.image.id} alt={this.state.image.imageAlt}
                                           description={this.state.image.description} title={this.state.image.title} date={this.state.image.date}
                                           refreshFunc={() => this.refreshImagesList()} deleteFunc={() => this.deleteImage()}></EditImageForm>: <> </> }

                        </TabPane>
                        <TabPane active={this.state.openTab === 2 ? true : false}>
                            <AddImageForm classNames={"add_new_image_container"}  refreshFunc={() => this.refreshImagesList()}></AddImageForm>
                        </TabPane>
                    </TabContent>
                </Tab>

            </div>
            </div>

        </>)
    }
}
export default GalleryManagement;