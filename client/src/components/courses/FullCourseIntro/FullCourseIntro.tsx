import { FC } from "react";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import styles from "./fullCourseIntro.module.scss";

interface Props {}

const FullCourseIntro: FC<Props> = () => {
    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Метамодернизм и современная русская проза
                    </h1>
                    <p className={styles.subtitle}>09.03.02</p>
                    <Button variant="light-blue">Записаться на курс</Button>
                </div>
            </Container>
        </section>
    );
};

export default FullCourseIntro;
