import { FC } from "react";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import { UsersTable } from "../UsersTable";
import styles from "./users.module.scss";

const Users: FC = () => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Пользователи</Title>
                <UsersTable />
            </Container>
        </section>
    );
};

export default Users;
