import {useQuery} from "@tanstack/react-query";
import {adminGetUsersListByGroup} from "js-api-client";

export const useGetUsersByGroup = (group, page, perPage) => {
    return useQuery(
        ['users', [group, page, perPage]], async () => {
            const {data} = await adminGetUsersListByGroup(group ,page, perPage)
            return data;
        },
        {
            retry: 1,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
        });
}