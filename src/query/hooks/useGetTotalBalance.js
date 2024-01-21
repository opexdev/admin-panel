import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetTotalBalance = () => {
    return useQuery(
        ['Total-balance'], async () => {
            /*if (chainId === null) return;*/
            const {data} = await axios.get(`https://walletstat.exky.io/v1/balance/total`)
            return data;

        },
        {
            retry: 1,
            /*enabled: false,
            initialData:[]*/
        });
}