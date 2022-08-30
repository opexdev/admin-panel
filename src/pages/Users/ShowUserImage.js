import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {createBlob} from "../../components/utils";
import {adminGetUserAttributedImages} from "js-api-client";

const UserImageBox = ({url, title}) => {

    const [photo, setPhoto] = useState()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(!!url)

    useEffect(() => {
        if (url) {
            setIsLoading(true)
            adminGetUserAttributedImages(url)
                .then((res) => setPhoto(createBlob(res)))
                .catch(() => setError(true))
                .finally(() => setIsLoading(false))
        }
    }, [url])

    const content = () => {
        if(!url) return <span>Photo not uploaded</span>
        if(isLoading) return <Loading/>
        if(error) return <span>Error</span>
        return <img src={photo} alt={title} style={{width: "100%", height: "100%"}}/>
    }

    return <div className="col-4 d-flex flex-column ps-2" style={{height: "60vh"}}>
        <div className="secondary-bg rounded-top d-flex justify-content-center align-items-center"
             style={{height: "90%"}}>
            {content()}
        </div>
        <div className="primary-bg rounded-bottom text-white d-flex justify-content-center align-items-center"
             style={{height: "10%"}}>
            <span style={{fontSize: "1.15rem"}}>{title}</span>
        </div>
    </div>
}

export default UserImageBox