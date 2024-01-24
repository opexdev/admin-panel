import {useQuery} from "@tanstack/react-query";
import {adminGetWalletTotalUsers} from "js-api-client";

export const useGetWalletTotalUsers = () => {
    return useQuery(
        ['Wallet-Total-Users'], async () => {
            /*if (chainId === null) return;*/
            const {data} = await adminGetWalletTotalUsers()
            return data;

        },
        {
            retry: 1,
            /*enabled: false,
            initialData:[]*/
        });
}