import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetTokenTotalBalance = () => {
    return useQuery(
        ['Token-Total-balance'], async () => {
            /*if (chainId === null) return;*/
            const {data} = await axios.get(`https://walletstat.exky.io/v1/balance/token/total`)
            return data;

        },
        {
            retry: 1,
            /*enabled: false,
            initialData:[]*/
        });
}