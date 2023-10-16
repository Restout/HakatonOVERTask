import { FC } from "react";

import cn from "clsx";

import { Container } from "components/shared/Container";

import styles from "./newsCreation.module.scss";
import { Title } from "components/ui/typography/Title";
import { NewsForm } from "../NewsForm";

interface Props {}

const NewsCreation: FC<Props> = () => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Новая новость</Title>
                <NewsForm />
            </Container>
        </section>
    );
};

export default NewsCreation;
