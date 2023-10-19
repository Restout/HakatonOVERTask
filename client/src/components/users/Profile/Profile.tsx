import { FC } from "react";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import styles from "./profile.module.scss";

const Profile: FC = () => {
    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.body}>
                    <header className={styles.header}>
                        <Title>Партосов Рамилио Буенович</Title>
                    </header>
                    <div className={styles.wrapper}>
                        <Title className={styles.subtitle} size="middle">
                            Информация
                        </Title>
                        <ProfileRow name="Телефон" value="7989234932" />
                        <ProfileRow name="Email" value="ramilio@mail.ru" />
                        <ProfileRow name="Дата рождения" value="15.08.2013" />
                        <ProfileRow name="Группа" value="432/433" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Profile;

function ProfileRow({ name, value }: { name: string; value: string }) {
    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}:</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}
