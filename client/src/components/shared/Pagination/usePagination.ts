import { useCallback } from "react";

import { useSearchParams } from "react-router-dom";

const PAGE_PARAM_NAME = "page";

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get(PAGE_PARAM_NAME) ?? 1;

    const handleChangePage = useCallback(
        ({ selected }: { selected: number }) => {
            searchParams.set(PAGE_PARAM_NAME, String(selected + 1));
            setSearchParams(searchParams);
        },
        [searchParams, setSearchParams],
    );

    return {
        page,
        changePage: handleChangePage,
    };
};
