import {useQuery} from "@tanstack/react-query";
import {adminGetWithdrawReqById} from "js-api-client";

export const useGetWithdrawInfo = (id) => {
    return useQuery(
        ['withdraw', id], async () => {
            const {data} = await adminGetWithdrawReqById(id)
            return data;
        },
        {
            retry: 1,
            select:(res) => res.withdraws[0],
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
        });
}