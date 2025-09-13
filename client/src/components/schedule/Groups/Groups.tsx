import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import GroupsService from "services/GroupsService";

import styles from "./groups.module.scss";

const Groups: FC = () => {
    // Получаем информацию о текущем пользователе
    const { user } = useTypedSelector((state) => state.user);

    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ["groups", user?.id], // Добавляем id пользователя в ключ запроса
        queryFn: () => GroupsService.getAll(user?.id), // Передаем id пользователя в запрос
        select(data) {
            return data.data;
        },
    });

    // Если пользователь не авторизован, показываем сообщение
    if (!user) {
        return (
            <section className={styles.section}>
                <Container>
                    <Alert variant="error">
                        Необходимо авторизоваться для просмотра групп
                    </Alert>
                </Container>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <Container>
                <header className={styles.header}>
                    <Title className={styles.title}>Расписание</Title>
                </header>
                {data && data.length > 0 ? (
                    <ul className={styles.groupsList}>
                        {data.map(({ groupId, groupName }) => (
                            <li key={groupId}>
                                <Link to={`${groupId}`}>{groupName}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    isSuccess &&
                    !isFetching && (
                        <Alert variant="info">У вас пока нет групп</Alert>
                    )
                )}
                <Error message={isError ? "Ошибка при загрузке групп" : null} />
                <Loading isLoading={isFetching} />
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
