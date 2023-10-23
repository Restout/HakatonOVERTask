import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { FullBid } from "components/bids/FullBid";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";

import ApplicationsService from "services/ApplicationsService";

import styles from "./fullBidPage.module.scss";

const FullBidPage: FC = () => {
    const { bidId = "" } = useParams();

    const { data, isLoading, isFetching, isError, isSuccess } = useQuery({
        queryKey: ["bid", bidId],
        queryFn: () => ApplicationsService.getById(Number(bidId)),
        select(data) {
            return data.data;
        },
    });

    return (
        <div className={styles.wrapper}>
            <Meta />
            <Error
                message={
                    isError ? "Что-то пошло не так, попробуйте еще раз" : null
                }
            />
            <Loading isLoading={isLoading} />
            {isSuccess && <FullBid bid={data} isFetching={isFetching} />}
        </div>
    );
};

export default FullBidPage;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader className={styles.loader} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return (
        <div className={styles.alertWrapper}>
            <Alert className={styles.alert} variant="error">
                {message}
            </Alert>
        </div>
    );
}

function Meta() {
    return (
        <Helmet>
            <title>Bid</title>
        </Helmet>
    );
}
