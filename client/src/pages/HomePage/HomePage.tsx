import { FC } from "react";

import { Helmet } from "react-helmet";

import { Feed } from "components/news/Feed";
import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

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
                <div className={styles.subsection}>
                    <h1 className={styles.mainTitle}>
                        Корпоративный университет Совкомбанк
                    </h1>
                    <p className={styles.mainText}>
                        Мы рады приветствовать вас на нашем веб-сервисе,
                        посвященном высшему образованию и качественному
                        обучению.{" "}
                        <span className={styles.highLight}>Совкомбанк</span> -
                        это место, где знания преображаются в навыки, а студенты
                        становятся агентами перемен. Наша миссия - предоставить
                        вам лучшее образование, развивать вас как профессионала
                        и помогать достичь ваших целей.
                    </p>
                </div>
                <div className={styles.subsection}>
                    <Title className={styles.subsectionTitle}>
                        Педагогический состав
                    </Title>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Наш университет, состоящий из
                        выдающихся преподавателей и ученых, предлагает
                        разнообразные образовательные программы, позволяющие
                        раскрыть ваши таланты и потенциал. Мы поддерживаем
                        инновации, активное участие студентов и поощряем
                        креативность.
                    </p>
                </div>
                <div className={styles.subsection}>
                    <Title className={styles.subsectionTitle}>
                        Образование
                    </Title>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Наши студенты - это будущее, и
                        мы стремимся к тому, чтобы оно было ярким и
                        образованным. На нашем веб-сервисе вы найдете информацию
                        о всех наших курсах, учебных материалах, академической
                        среде и возможностях для развития. Мы гордимся успехами
                        наших студентов и готовы поддерживать вас на пути к
                        достижению ваших целей.
                    </p>
                </div>
                <div className={styles.subsection}>
                    <Title className={styles.subsectionTitle}>
                        Структура и органы управления образовательной
                        организацией
                    </Title>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Ректор: Иван Иванович Иванов.
                    </p>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Заведующий отделом образования:
                        Елена Петровна Петрова.
                    </p>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Совет образовательной
                        организации: председатель - Ольга Сергеевна Сергеева.
                    </p>
                </div>
                <div className={styles.subsection}>
                    <Title className={styles.subsectionTitle}>Документы</Title>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Учредительные документы: Устав
                        "Корпоративного университета".
                    </p>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Лицензии и аккредитации:
                        Лицензия на осуществление образовательной деятельности
                        №12345, аккредитация университета.
                    </p>
                </div>
                <div className={styles.subsection}>
                    <Title className={styles.subsectionTitle}>
                        Материально-техническое обеспечение и оснащенность
                        образовательного процесса
                    </Title>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Модернизированные аудитории.
                    </p>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Электронная библиотека с
                        доступом к онлайн-ресурсам.
                    </p>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Высокоскоростной Wi-Fi на
                        территории университета.
                    </p>
                </div>
                <div className={styles.subsection}>
                    <Title className={styles.subsectionTitle}>
                        Доступная среда
                    </Title>
                    <p className={styles.paragraph}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Университет обеспечивает
                        доступность для лиц с ограниченными возможностями. Есть
                        специализированные аудитории и услуги.
                    </p>
                </div>
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
