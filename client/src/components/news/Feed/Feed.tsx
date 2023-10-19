import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import cn from "clsx";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import NewsService from "services/NewsService";

import { formatDate } from "utils/formatDate";
import { getServerImagePath } from "utils/getServerImagePath";

import { Post } from "./Post";
import styles from "./feed.module.scss";

interface Props {
    className?: string;
}

const Feed: FC<Props> = ({ className }) => {
    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: ["news"],
        queryFn: () => NewsService.getAll({ limit: 30, page: 1 }),
        select(data) {
            return data.data;
        },
    });

    return (
        <section className={cn(styles.section, className)}>
            <Container>
                <Title className={styles.title}>Новости и события</Title>
                {isSuccess && (
                    <ul className={styles.feedList}>
                        {data.map((news) => (
                            <li key={news.id}>
                                <Post
                                    date={formatDate(news.publish_date).date}
                                    src={getServerImagePath(news.imagePath)}
                                    text={news.content}
                                    title={news.title}
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

export default Feed;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
