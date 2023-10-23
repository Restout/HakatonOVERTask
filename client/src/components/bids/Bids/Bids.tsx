import { FC } from "react";

import { useLocation } from "react-router-dom";

import { Container } from "components/shared/Container";
import {
    Pagination,
    PaginationProps,
    usePagination,
} from "components/shared/Pagination";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import { IApplicationContacts } from "types/application.interface";

import { BidsTable } from "../BidsTable";
import styles from "./bids.module.scss";

interface Props {
    bids: IApplicationContacts[];
    pageCount: number;
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    isFetching: boolean;
}

const Bids: FC<Props> = ({
    bids,
    pageCount,
    isSuccess,
    isError,
    isLoading,
    isFetching,
}) => {
    const location = useLocation();
    const isAdminPage = location.pathname.includes("admin");

    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>
                    {isAdminPage ? "Управление заявками" : "Заявки"}
                </Title>
                {isSuccess && !isLoading && bids.length > 0 && (
                    <>
                        <BidsTable bids={bids} isDisabled={isFetching} />
                        <PaginationController pageCount={pageCount} />
                    </>
                )}
                {isSuccess && bids.length < 1 && (
                    <Alert variant="info">Нет доступных заявок</Alert>
                )}
                <Error message={isError ? "Something went wrong" : null} />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default Bids;

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
