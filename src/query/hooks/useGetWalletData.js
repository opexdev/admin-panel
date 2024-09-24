import {useQuery} from "@tanstack/react-query";
import {adminGetWalletData} from "js-api-client";

export const useGetWalletData = (params) => {
    return useQuery(
        ['wallet-data', params], async () => {
            const {data} = await adminGetWalletData(params)
            return data;
        },
        {
            retry: 1,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
        });
}