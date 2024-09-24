import {useQuery} from "@tanstack/react-query";
import {adminGetWithdrawsReq} from "js-api-client";

export const useGetWithdrawsReq = (status , page, perPage) => {
    return useQuery(
        ['withdraws', [status , page, perPage]], async () => {
            const {data} = await adminGetWithdrawsReq(status , page, perPage)
            return data;
        },
        {
            retry: 1,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
        });
}
