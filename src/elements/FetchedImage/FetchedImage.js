import React, {useEffect, useState} from "react";
import {getImageBlob} from "../../Utils/api";
import {Image} from "@material-tailwind/react";

const FetchedImage = ({imageId, imageAlt}) => {

    const [imagePath, setImagePath] = useState();

    useEffect(async () => {
        setImagePath();
        const response = await getImageBlob(imageId);
        setImagePath(response);
    }, [imageId])

    return (
        <>

            {imagePath !== undefined ? <Image
                src={imagePath} alt={imageAlt}
                rounded={false}
                raised={true}
            />: <i className='sp-white'></i> }

        </>
    )
}

export default FetchedImage;
