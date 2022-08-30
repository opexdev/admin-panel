import {useQuery} from "@tanstack/react-query";
import {adminGetUsersList} from "js-api-client";

export const useGetUsersList = (page, perPage) => {
    return useQuery(
        ['users', [page, perPage]], async () => {
            const {data} = await adminGetUsersList(page, perPage)
            return data;
        },
        {
            retry: 1,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
        });
}