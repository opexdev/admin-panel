import React from "react";
import {toAbsoluteUrl} from "./utils";

const Loading = () => {
    return <img src={toAbsoluteUrl("/media/img/lineLoading.gif")} alt="" style={{width:"6rem"}}/>
}

export default Loading