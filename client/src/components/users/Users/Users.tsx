import { FC } from "react";

import { Container } from "components/shared/Container";
import {
    Pagination,
    PaginationProps,
    usePagination,
} from "components/shared/Pagination";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import { IUser } from "types/user.interface";

import { UsersTable } from "../UsersTable";
import styles from "./users.module.scss";

interface Props {
    users: IUser[];
    pageCount: number;
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    isFetching: boolean;
}

const Users: FC<Props> = ({
    users,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    pageCount,
}) => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Пользователи</Title>
                {isSuccess && (
                    <>
                        <UsersTable
                            users={users}
                            isDisabled={isFetching}
                        />
                        <PaginationController pageCount={pageCount} />
                    </>
                )}
                <Error message={isError ? "Something went wrong" : null} />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default Users;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}

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
