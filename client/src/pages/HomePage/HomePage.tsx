import { FC } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";
import { Button } from "components/ui/Button";

import { GROUPS_PATH, ROOMS_PATH, SCHEDULE_PATHNAME } from "constants/routesPathnames";

import styles from "./homePage.module.scss";

const HomePage: FC = () => {
    return (
        <>
            <Intro />
            <FeatureCards />
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
                        Образовательная платформа
                    </h1>
                    <p className={styles.mainText}>
                        Мы рады приветствовать вас на нашем веб-сервисе,
                        посвященном высшему образованию и качественному
                        обучению. Наша образовательная платформа -
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
                        &nbsp;&nbsp;&nbsp;&nbsp;Наша платформа, объединяющая
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
                        образованным. На нашей платформе вы найдете информацию
                        о занятиях, расписании и возможностях для взаимодействия с другими студентами.
                        Мы гордимся успехами наших студентов и готовы поддерживать вас на пути к
                        достижению ваших целей.
                    </p>
                </div>
            </Container>
        </section>
    );
}

function FeatureCards() {
    return (
        <section className={styles.featuresSection}>
            <Container>
                <Title className={styles.featuresTitle}>
                    Основные возможности
                </Title>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>👥</div>
                        <h3 className={styles.featureTitle}>Группы</h3>
                        <p className={styles.featureDescription}>
                            Создавайте группы и добавляйте участников для совместной работы и обучения
                        </p>
                        <Link to={GROUPS_PATH}>
                            <Button variant="dark-blue" className={styles.featureButton}>
                                Перейти к группам
                            </Button>
                        </Link>
                    </div>
                    
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📅</div>
                        <h3 className={styles.featureTitle}>Расписание</h3>
                        <p className={styles.featureDescription}>
                            Управляйте расписанием занятий, создавайте и редактируйте события
                        </p>
                        <Link to={`/${SCHEDULE_PATHNAME}`}>
                            <Button variant="dark-blue" className={styles.featureButton}>
                                Открыть расписание
                            </Button>
                        </Link>
                    </div>
                    
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📹</div>
                        <h3 className={styles.featureTitle}>Видеозвонки</h3>
                        <p className={styles.featureDescription}>
                            Проводите видеоконференции и онлайн-лекции с участниками групп
                        </p>
                        <Link to={ROOMS_PATH}>
                            <Button variant="dark-blue" className={styles.featureButton}>
                                Начать видеозвонок
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function Meta() {
    return (
        <Helmet>
            <title>Главная - Образовательная платформа</title>
            <meta
                name="description"
                content="Главная страница образовательной платформы"
            />
        </Helmet>
    );
}
