import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import UserService from "services/UserService";

import { Users } from "../Users";

const LIMIT = 10;

const AdminUsers: FC = () => {
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page") ?? 1;

    const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery({
        queryKey: ["users", page],
        queryFn: () => UserService.getAll({ limit: LIMIT, page }),
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

    return (
        <Users
            users={data?.users ?? []}
            pageCount={totalPages}
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isFetching={isPreviousData}
        />
    );
};

export default AdminUsers;
