import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetTokenTotalBalanceById = (chainId) => {
    return useQuery(
        ['token-Total-balance', chainId], async () => {
            /*if (chainId === null) return;*/
            const {data} = await axios.get(`https://walletstat.exky.io/v1/balance/token/${chainId}/total`)
            return data;

        },
        {
            retry: 1,
            /*enabled: false,
            initialData:[]*/
        });
}