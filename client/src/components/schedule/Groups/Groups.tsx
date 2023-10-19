import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import GroupsService from "services/GroupsService";

import { SCHEDULE_PATHNAME } from "constants/routesPathnames";

import styles from "./groups.module.scss";

const Groups: FC = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["groups"],
        queryFn: GroupsService.getAll,
        select(data) {
            return data.data;
        },
    });

    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Учебные группы</Title>
                {isSuccess && (
                    <ul className={styles.groupsList}>
                        {data.map(({ groupId, groupName }) => (
                            <li key={groupId}>
                                <Link to={`${groupId}`}>{groupName}</Link>
                            </li>
                        ))}
                    </ul>
                )}
                <Error message={isError ? "Something went wrong" : null} />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default Groups;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
