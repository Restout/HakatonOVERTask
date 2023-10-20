import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Bids } from "components/bids/Bids";

import useTypedSelector from "hooks/shared/useTypedSelector";

import ApplicationsService from "services/ApplicationsService";

import styles from "./bidsPage.module.scss";

const LIMIT = 10;

const BidsPage: FC = () => {
    const [searchParams] = useSearchParams();
    const user = useTypedSelector((state) => state.user.user);

    const page = searchParams.get("page") ?? 1;

    const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery({
        queryKey: ["users", page],
        queryFn: () =>
            ApplicationsService.getByUserId(user ? user.id : -1, {
                limit: LIMIT,
                page,
            }),
        select(response) {
            const totalUsers = response.headers["user_count"];
            return {
                users: response.data,
                totalCount: parseInt(totalUsers),
            };
        },
        keepPreviousData: true,
    });

    const totalPages = data?.totalCount
        ? Math.ceil(data.totalCount / LIMIT)
        : 1;

    if (!isSuccess) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <Bids
                bids={data.users}
                pageCount={totalPages}
                isError={isError}
                isFetching={isPreviousData}
                isLoading={isLoading}
                isSuccess={isSuccess}
            />
        </div>
    );
};

export default BidsPage;
