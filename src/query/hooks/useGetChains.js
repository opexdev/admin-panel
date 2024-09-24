import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetChains = () => {
    return useQuery(
        ['chains'], async () => {
            const {data} = await axios.get('https://walletstat.exky.io/v1/chain')
            return data;
        },
        {
            retry: 1,
        });
}