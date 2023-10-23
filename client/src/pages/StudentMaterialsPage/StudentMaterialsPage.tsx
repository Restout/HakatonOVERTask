import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { Users } from "components/users/Users";

import useTypedSelector from "hooks/shared/useTypedSelector";

import UserService from "services/UserService";

const StudentMaterialsPage: FC = () => {
    const { lessonId = "" } = useParams();
    const userId = useTypedSelector((state) => state.user.user?.id) as number;

    const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery({
        queryKey: ["material-students"],
        queryFn: () =>
            UserService.getMaterialsStudent(parseInt(lessonId), userId),
        select: (data) => data.data,
    });

    return (
        <>
            <Meta />
            <Users
                isError={isError}
                isFetching={isPreviousData}
                isLoading={isLoading}
                isSuccess={isSuccess}
                pageCount={0}
                users={data ?? []}
            />
        </>
    );
};

export default StudentMaterialsPage;

function Meta() {
    return (
        <Helmet>
            <title>Materials | Students</title>
        </Helmet>
    );
}
