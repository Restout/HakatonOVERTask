import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { FullUser } from "components/users/FullUser";

import UserService from "services/UserService";

import styles from "./fullUserPage.module.scss";

const FullUserPage: FC = () => {
    const { userId = "" } = useParams();

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["user"],
        queryFn: () => UserService.getUserById(Number(userId)),
        select(data) {
            return data.data;
        },
    });

    return (
        <div className={styles.wrapper}>
            <Error message={isError ? "Something went wrong" : null} />
            <Loading isLoading={isLoading} />
            {isSuccess && <FullUser user={data} />}
        </div>
    );
};

export default FullUserPage;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
