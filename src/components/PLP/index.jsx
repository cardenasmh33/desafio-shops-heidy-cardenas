import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import Shelf from "./Shelf";
import Pagination from "./Pagination";
import './styles.scss'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function ProductListPage(props) {
    const query = useQuery();
    const searchQuery = query.get('search');
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [currentBatch, setCurrentBatch] = useState(-1);
    const [isFetching, setIsFetching] = useState(false);
    const itemsPerPage = 10;
    const itemsPerBatch = 50;

    async function fetchItems(batch) {
        if (isFetching) return;
        setIsFetching(true);
        try {
            const offset = batch * itemsPerBatch;
            const { data } = await axios.get(`http://localhost:5000/api/items?offset=${offset}&q=${searchQuery}`);
            setItems(data.items);
            setTotalItems(data.paging.total);
            setCurrentBatch(batch);
        } catch (error) {
            console.error('Fetching items: ', error);
        } finally {
            setIsFetching(false);
        }
    }

    function handlePageChange(page) {
        setCurrentPage(page);


        const batch = Math.floor((page - 1) * itemsPerPage / itemsPerBatch);
        if (batch > currentBatch) {
            fetchItems(batch);
        }

        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setCurrentPage(1);
        fetchItems(0);
    }, [searchQuery]);

    const displayItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage % itemsPerBatch;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    }, [items, currentPage]);

    if (isFetching) {
        return (
            <div className="plp-loader"><span className="loader" /></div>
        );
    }

    return (
        <div className="plp-container">
            {displayItems.map((item) => <Shelf key={item.id} itemData={item} />)}
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ProductListPage;