import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetTokens = () => {
    return useQuery(
        ['tokens'], async () => {
            const {data} = await axios.get('https://walletstat.exky.io/v1/token')
            return data;
        },
        {
            retry: 1,
        });
}