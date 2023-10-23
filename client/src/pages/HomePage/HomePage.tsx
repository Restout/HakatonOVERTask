import { FC } from "react";

import { Helmet } from "react-helmet";

import { Feed } from "components/news/Feed";
import { Container } from "components/shared/Container";

import styles from "./homePage.module.scss";

const HomePage: FC = () => {
    return (
        <>
            <Intro />
            <Feed />
        </>
    );
};

export default HomePage;

function Intro() {
    return (
        <section className={styles.section}>
            <Meta />
            <Container>
                <h1 className={styles.title}>
                    Корпоративный университет Совкомбанк
                </h1>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;Мы рады приветствовать вас на нашем
                    веб-сервисе, посвященном высшему образованию и качественному
                    обучению. <span>Совкомбанк</span> - это место, где знания
                    преображаются в навыки, а студенты становятся агентами
                    перемен. Наша миссия - предоставить вам лучшее образование,
                    развивать вас как профессионала и помогать достичь ваших
                    целей.
                </p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;Наш университет, состоящий из
                    выдающихся преподавателей и ученых, предлагает разнообразные
                    образовательные программы, позволяющие раскрыть ваши таланты
                    и потенциал. Мы поддерживаем инновации, активное участие
                    студентов и поощряем креативность.
                </p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;Наши студенты - это будущее, и мы
                    стремимся к тому, чтобы оно было ярким и образованным. На
                    нашем веб-сервисе вы найдете информацию о всех наших курсах,
                    учебных материалах, академической среде и возможностях для
                    развития. Мы гордимся успехами наших студентов и готовы
                    поддерживать вас на пути к достижению ваших целей.
                </p>
            </Container>
        </section>
    );
}

function Meta() {
    return (
        <Helmet>
            <title>Home</title>
            <meta
                name="description"
                content="Главная страница корпоративного университета Совкомбанк"
            />
        </Helmet>
    );
}
