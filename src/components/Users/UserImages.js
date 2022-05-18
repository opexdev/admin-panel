import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading";

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
        } /*else {
            setAcceptFormPath("Photo not uploaded")
        }*/

        if (attributes?.selfiePath?.[0]) {
            getImages(attributes?.selfiePath?.[0]).then((res) => setSelfiePath(createBlob(res)))
        }

    }, [attributes])

    const content = () => {

    /*  if (!attributes && (!attributes?.idCardPath?.[0] || !attributes?.acceptFormPath?.[0] || !idCardPath)) {
          return <div className="col-12 d-flex justify-content-center align-items-center card mt-4" style={{height:"50vh"}}>Photo not uploaded</div>
      }
      if (!attributes) {
          return <div className="col-12 d-flex justify-content-center align-items-center mt-4" style={{height:"50vh"}}><Loading/></div>
      }*/

      return <div className="d-flex flex-row col-12">

          {acceptFormPath !== "Photo not uploaded" ?

          <div className="col-4 d-flex flex-column pe-2" style={{height:"60vh"}}>
              <div className="secondary-bg rounded-top d-flex justify-content-center align-items-center" style={{height:"90%"}}>
                  {acceptFormPath ? <img src={acceptFormPath} alt="" style={{width:"100%" , height:"100%"}}/> : attributes ? <Loading/> : <span>Photo not uploaded</span> }
              </div>
              <div className="primary-bg rounded-bottom text-white d-flex justify-content-center align-items-center" style={{height:"10%"}}>
                  <span style={{fontSize:"1.15rem"}}>Accept form</span>
              </div>
          </div>
               : "" }
          <div className="col-4 d-flex flex-column px-2" style={{height:"60vh"}}>
              <div className="secondary-bg rounded-top d-flex justify-content-center align-items-center" style={{height:"90%"}}>
                  {selfiePath ? <img src={selfiePath} alt="" style={{width:"100%" , height:"100%"}}/> : attributes ? <Loading/> : <span>Photo not uploaded</span> }
              </div>
              <div className="primary-bg rounded-bottom text-white d-flex justify-content-center align-items-center" style={{height:"10%"}}>
                  <span style={{fontSize:"1.15rem"}}>Selfie</span>
              </div>
          </div>
          <div className="col-4 d-flex flex-column ps-2" style={{height:"60vh"}}>
              <div className="secondary-bg rounded-top d-flex justify-content-center align-items-center" style={{height:"90%"}}>
                  {idCardPath ? <img src={idCardPath} alt="" style={{width:"100%" , height:"100%"}}/> : attributes ? <Loading/> : <span>Photo not uploaded</span> }
              </div>
              <div className="primary-bg rounded-bottom text-white d-flex justify-content-center align-items-center" style={{height:"10%"}}>
                  <span style={{fontSize:"1.15rem"}}>IDcard</span>
              </div>
          </div>



      </div>

    }

    return <div className="col-12 userInfoBox my-5">
            <h4 className="py-3 primary-bg rounded d-flex justify-content-center align-items-center">User Documents</h4>
            {content()}
        </div>
}

export default UserImages