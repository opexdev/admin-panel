import {useQuery} from "@tanstack/react-query";
import {adminGetWhiteList} from "js-api-client";

export const useGetWhiteList = () => {
    return useQuery(
        ['whiteList'], async () => {
            const {data} = await adminGetWhiteList()
            return data?.data;
        },
        {
            retry: 1,
        });
}