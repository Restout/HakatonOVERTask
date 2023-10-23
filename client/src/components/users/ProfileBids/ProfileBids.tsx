import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

import { FullBid } from "components/bids/FullBid";
import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import ApplicationsService from "services/ApplicationsService";

import styles from "./profileBids.module.scss";

interface Props {}

const ProfileBids: FC<Props> = () => {
    const userId = useTypedSelector((state) => state.user.user?.id) as number;

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["bids", userId],
        queryFn: () => ApplicationsService.getStudentApplications(userId),
        select(data) {
            return data.data;
        },
    });

    return (
        <section className={styles.section}>
            <Meta />
            <Container>
                <Title className={styles.title}>Мои заявки</Title>
                {isSuccess && data.length < 1 && (
                    <Alert variant="info">Нет доступных заявок</Alert>
                )}
                {isSuccess && (
                    <ul className={styles.bidsList}>
                        {data.map((application) => (
                            <li key={application.applicationID}>
                                <FullBid bid={application} isFetching={false} />
                            </li>
                        ))}
                    </ul>
                )}
                <Error isError={isError} />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default ProfileBids;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ isError }: { isError: boolean }) {
    if (!isError) return null;

    return (
        <Alert variant="error">Что-то пошло не так, попробуйте еще раз</Alert>
    );
}

function Meta() {
    return (
        <Helmet>
            <title>Profile | Bids</title>
            <meta name="description" content="Страница отправленных заявок" />
        </Helmet>
    );
}
