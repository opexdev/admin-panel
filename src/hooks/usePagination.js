import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [paginate, setPaginate] = useState({page: 1, perPage: 1})

    useEffect(() => {
        const page = searchParams.get('page') ?? 1
        const perPage = searchParams.get('per_page') ?? 10
        setPaginate({perPage : parseInt(perPage), page: parseInt(page)})
    }, [searchParams]);

    return [paginate,searchParams,setSearchParams];
}

export default usePagination