import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import { formatDate } from "utils/formatDate";
import { getRoleName } from "utils/getRoleName";

import { IUser } from "types/user.interface";

import styles from "./fullUser.module.scss";

interface Props {
    user: IUser;
}

const FullUser: FC<Props> = ({ user }) => {
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
                            <UserRow name="Фамилия" value={user.lastName} />
                            <UserRow name="Имя" value={user.firstName} />
                            <UserRow name="Отчество" value={user.fatherName} />
                            <UserRow name="Email" value={user.email} />
                            <UserRow name="Телефон" value={user.phone} />
                            <UserRow
                                name="Дата рождения"
                                value={formatDate(user.birthday).date}
                            />
                            <UserRow
                                name="Статус"
                                value={getRoleName(user.role)}
                            />
                        </div>
                        <footer className={styles.footer}>
                            <Button variant="light-blue">Редактировать</Button>
                            <Button variant="red">Удалить</Button>
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
