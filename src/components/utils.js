import toast from "react-hot-toast";

export const toAbsoluteUrl = (path) => process.env.PUBLIC_URL + path

export const createBlob = (res) => {
    const blob = new Blob([res.data], {type: res.headers['content-type']});
    return URL.createObjectURL(blob);
}
export const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value)
    toast.success("Copied!")
}