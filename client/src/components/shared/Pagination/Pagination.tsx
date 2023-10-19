import { FC } from "react";

import cn from "clsx";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

import styles from "./pagination.module.scss";

export interface PaginationProps extends ReactPaginateProps {}

const Pagination: FC<PaginationProps> = ({ className, ...rest }) => {
    return (
        <ReactPaginate
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            className={cn(styles.pagination, className)}
            breakLabel="..."
            nextLabel={null}
            previousLabel={null}
            pageLinkClassName={styles.link}
            breakLinkClassName={styles.link}
            activeLinkClassName={styles.active}
            {...rest}
        />
    );
};

export default Pagination;
