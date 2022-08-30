import React from "react";
import {useSearchParams} from "react-router-dom";

const Pagination = ({paginate, total}) => {
    const maxPage = Math.ceil(total / paginate?.perPage)
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams])
    const items = maxPage > 0 ? [...Array(maxPage > 3 ? 3 : maxPage).keys()] : [];

    const nextPage = () => {
        if (paginate.page === maxPage) return
        setSearchParams({...params, per_page: paginate.perPage, page: ++paginate.page})
    }
    const pervPage = () => {
        if (paginate.page === 0) return
        setSearchParams({...params, per_page: paginate.perPage, page: --paginate.page})
    }

    const customPage = (page) => {
        setSearchParams({...params, per_page: paginate.perPage, page: page})
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${paginate.page === 1 || maxPage === 0 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={pervPage}>Previous</button>
                </li>
                {
                    items.map((item) => {
                        return (
                            <li className={`page-item ${paginate.page === item + 1 ? "active" : ""}`} key={item}>
                                <button className="page-link" onClick={() => customPage(item + 1)}>{item + 1}</button>
                            </li>
                        )
                    })
                }
                {
                    maxPage > 3 ?
                        <>
                            <li className="page-item">
                                <span className="page-link">...</span>
                            </li>
                            <li className={`page-item ${paginate.page === maxPage ? "active" : ""}`}>
                                <button className="page-link" onClick={() => customPage(maxPage)}>{maxPage}</button>
                            </li>
                        </>
                        : ""
                }

                <li className={`page-item ${maxPage < 2 || paginate.page === maxPage ? "disabled" : ""}`}>
                    <button className="page-link" onClick={nextPage}>Next</button>
                </li>
            </ul>
        </nav>)
}

export default Pagination
