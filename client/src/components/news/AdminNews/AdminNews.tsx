import { FC, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import NewsService from "services/NewsService";

import { formatDate } from "utils/formatDate";
import { getServerImagePath } from "utils/getServerImagePath";

import { Post } from "../Feed/Post";
import { NewsCreation } from "../NewsCreation";
import styles from "./adminNews.module.scss";

const AdminNews: FC = () => {
    const [isAdding, setIsAdding] = useState(false);
    const queryClient = useQueryClient();

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: ["news"],
        queryFn: () => NewsService.getAll({ limit: 30, page: 1 }),
        select(data) {
            return data.data;
        },
    });

    const { mutate } = useMutation((id: number) => NewsService.delete(id), {
        onSettled: () => {
            queryClient.invalidateQueries(["news"]);
        },
    });

    return (
        <section className={styles.section}>
            <Container>
                <header className={styles.header}>
                    <Title className={styles.title}>Управление новостями</Title>
                    <Button
                        variant="dark-blue"
                        onClick={() => setIsAdding((prev) => !prev)}
                    >
                        {isAdding ? "Отменить" : "Добавить"}
                    </Button>
                </header>
                {isAdding && <NewsCreation className={styles.creation} />}
                {isSuccess && (
                    <ul className={styles.feedList}>
                        {data.map((news) => (
                            <li key={news.id}>
                                <Post
                                    date={formatDate(news.publish_date).date}
                                    src={getServerImagePath(news.imagePath)}
                                    text={news.content}
                                    title={news.title}
                                    onDeleteClick={() => mutate(news.id)}
                                />
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

export default AdminNews;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
