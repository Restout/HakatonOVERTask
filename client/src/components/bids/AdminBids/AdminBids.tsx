import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import useTypedSelector from "hooks/shared/useTypedSelector";

import ApplicationsService from "services/ApplicationsService";

import { Bids } from "../Bids";

const LIMIT = 2;

const AdminBids: FC = () => {
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page") ?? 1;

    const user = useTypedSelector((state) => state.user.user);

    const { data, isLoading, isError, isSuccess, isPreviousData, isFetching } =
        useQuery({
            queryKey: ["bids", page],
            queryFn: () =>
                ApplicationsService.getByUserId(user ? user.id : -1, {
                    limit: LIMIT,
                    page,
                }),
            select(response) {
                const totalApplications = response.headers["countapplications"];
                return {
                    users: response.data,
                    totalCount: parseInt(totalApplications),
                };
            },
            enabled: user !== null,
            keepPreviousData: true,
        });

    const totalPages = data?.totalCount
        ? Math.ceil(data.totalCount / LIMIT)
        : 1;

    if (!isSuccess) {
        return null;
    }

    return (
        <Bids
            bids={data.users}
            pageCount={totalPages}
            isError={isError}
            isFetching={isPreviousData || isFetching}
            isLoading={isLoading}
            isSuccess={isSuccess}
        />
    );
};

export default AdminBids;
