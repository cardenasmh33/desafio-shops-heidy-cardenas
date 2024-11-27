import React from "react";

function Pagination(props) {
    const {
        currentPage,
        itemsPerPage,
        totalItems,
        onPageChange
    } = props;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesPerGroup = 10;
    const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    return (
        <nav className="pagination-container">
            <ul className="pagination">
                {currentPage > 1 && <li className="prev-page page-item">
                    <button
                        className="prev-page page-button"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        {`< Anterior`}
                    </button>
                </li>}
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <li className="page-item" key={index}>
                        <button
                            key={startPage + index}
                            className={`page-button ${currentPage === startPage + index ? 'active' : ''}`}
                            onClick={() => onPageChange(startPage + index)}
                        >
                            {startPage + index}
                        </button>
                    </li>
                ))}
                {endPage < totalPages && <li className="next-page page-item">
                    <button
                        className="next-page page-button"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        {`Siguiente >`}
                    </button>
                </li>}
            </ul>
        </nav>
    );
}

export default Pagination;