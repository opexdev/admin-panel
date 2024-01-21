import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetTotalBalanceByChain = (chainId) => {
    return useQuery(
        ['chain-Total-balance', chainId], async () => {
            /*if (chainId === null) return;*/
            const {data} = await axios.get(`https://walletstat.exky.io/v1/balance/${chainId}/total`)
            return data;

        },
        {
            retry: 1,
            /*enabled: false,
            initialData:[]*/
        });
}