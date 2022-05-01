import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserImages = ({attributes}) => {

    const axiosPrivate = useAxiosPrivate();
    const [idCardPath, setIdCardPath] = useState()
    const [acceptFormPath, setAcceptFormPath] = useState()
    const [selfiePath, setSelfiePath] = useState()

    const getImages = async (url) => {
        return await axiosPrivate.get(`/storage/admin/download${url}`, {
                responseType: "arraybuffer"
            }
        )
    }
    const createBlob = (res) => {
        const blob = new Blob([res.data], {type: res.headers['content-type']});
        return URL.createObjectURL(blob);
    }

    useEffect(() => {
        if (attributes?.idCardPath?.[0]) {
            getImages(attributes?.idCardPath?.[0]).then((res) => setIdCardPath(createBlob(res)))
        }

        if (attributes?.acceptFormPath?.[0]) {
            getImages(attributes?.acceptFormPath?.[0]).then((res) => setAcceptFormPath(createBlob(res)))
        }

        if (attributes?.selfiePath?.[0]) {
            getImages(attributes?.selfiePath?.[0]).then((res) => setSelfiePath(createBlob(res)))
        }

    }, [attributes])

    return <div className="card">
        <h5 className="card-header p-2">User Documents</h5>
        <div className="card-body">
            <div className="row">
                {
                    !attributes ? <div className="col-12 d-flex justify-content-center">
                        <div className="spinner-border text-secondary text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ""
                }
                {
                    acceptFormPath ?
                        <figure className="figure col-4">
                            <img src={acceptFormPath} className="figure-img img-fluid rounded"
                                 alt="User accept form"/>
                            <figcaption className="figure-caption">User accept form
                            </figcaption>
                        </figure> : ""
                }
                {
                    selfiePath ?
                        <figure className="figure col-4">
                            <img src={selfiePath} className="figure-img img-fluid rounded" alt="User accept form"/>
                            <figcaption className="figure-caption">User selfie image
                            </figcaption>
                        </figure> : ""
                }
                {
                    idCardPath?
                        <figure className="figure col-4">
                            <img src={idCardPath} className="figure-img img-fluid rounded" alt="User accept form"/>
                            <figcaption className="figure-caption">User idCard
                            </figcaption>
                        </figure> : ""
                }
            </div>
        </div>
    </div>
}

export default UserImages