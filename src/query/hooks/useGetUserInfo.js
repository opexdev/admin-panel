import {useQuery} from "@tanstack/react-query";
import {adminGetUserInfo} from "js-api-client";

export const useGetUserInfo = (id) => {
    return useQuery(
        ['user', id], async () => {
            const {data} = await adminGetUserInfo(id)
            return data;
        },
        {
            retry: 1,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
        });
}