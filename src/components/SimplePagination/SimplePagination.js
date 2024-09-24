import React from "react";
import {useSearchParams} from "react-router-dom";

const SimplePagination = ({paginate, length}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams])

    const nextPage = () => {
        setSearchParams({...params, per_page: paginate.perPage, page: ++paginate.page})
    }
    const pervPage = () => {
        if (paginate.page === 0) return
        setSearchParams({...params, per_page: paginate.perPage, page: --paginate.page})
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${paginate.page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={pervPage}>Previous</button>
                </li>

                <li className={`page-item ${ paginate.perPage > length ? "disabled" : ""}`}>
                    <button className="page-link" onClick={nextPage}>Next</button>
                </li>
            </ul>
        </nav>)
}

export default SimplePagination
