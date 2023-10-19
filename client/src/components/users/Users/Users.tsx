import { FC } from "react";

import { Container } from "components/shared/Container";
import {
    Pagination,
    PaginationProps,
    usePagination,
} from "components/shared/Pagination";
import { Title } from "components/ui/typography/Title";

import { UsersTable } from "../UsersTable";
import styles from "./users.module.scss";

const Users: FC = () => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Пользователи</Title>
                <UsersTable />
                <PaginationController pageCount={5} />
            </Container>
        </section>
    );
};

export default Users;

function PaginationController({ pageCount }: PaginationProps) {
    const { changePage, page } = usePagination();

    return pageCount > 1 ? (
        <Pagination
            className={styles.pagination}
            pageCount={pageCount}
            onPageChange={changePage}
            renderOnZeroPageCount={() => null}
            disableInitialCallback={true}
            forcePage={Number(page) - 1}
        />
    ) : null;
}
