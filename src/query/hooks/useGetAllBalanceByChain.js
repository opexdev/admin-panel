import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetAllBalanceByChain = (chainId, params) => {
    return useQuery(
        ['chain-balance', chainId], async () => {
            /*if (chainId === null) return;*/
            const {data} = await axios.get(`https://walletstat.exky.io/v1/balance/${chainId}`, {
                params: params
            })
            return data;
        },
        {
            retry: 1,
            /*enabled: false,
            initialData:[]*/
        });
}