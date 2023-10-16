import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import styles from "./fullUser.module.scss";

const FullUser: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <Container>
                    <div className={styles.body}>
                        <header className={styles.header}>
                            <h5>Пользователь №432</h5>
                            <button onClick={() => navigate(-1)}>
                                Все пользователи
                            </button>
                        </header>
                        <div className={styles.description}>
                            <UserRow name="Id" value="13" />
                            <UserRow name="Дата рождения" value="11.09.2023" />
                            <UserRow name="Услуга" value="Какая-то" />
                            <UserRow name="Имя" value="Артем" />
                            <UserRow name="Фамилия" value="Артемов" />
                            <UserRow name="Email" value="artemka@mail.ru" />
                            <UserRow name="Телефон" value="483248948" />
                            <UserRow name="Статус" value="Студент" />
                        </div>
                        <footer className={styles.footer}>
                            <Button variant="light-blue">Редактировать</Button>
                        </footer>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default FullUser;

function UserRow({ name, value }: { name: string; value: string }) {
    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}:</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}
