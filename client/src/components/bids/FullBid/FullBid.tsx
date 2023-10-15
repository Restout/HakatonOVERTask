import { FC } from "react";

import { useNavigate } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import styles from "./fullBid.module.scss";

const FullBid: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.bid}>
                <Container>
                    <div className={styles.body}>
                        <header className={styles.header}>
                            <h5>Заявка №123</h5>
                            <button onClick={() => navigate(-1)}>
                                Все заявки
                            </button>
                        </header>
                        <div className={styles.description}>
                            <BidRow name="Id" value="13" />
                            <BidRow name="Дата" value="11.09.2023" />
                            <BidRow name="Услуга" value="Какая-то" />
                            <BidRow name="Имя" value="Артем" />
                            <BidRow name="Фамилия" value="Артемов" />
                            <BidRow name="Email" value="artemka@mail.ru" />
                            <BidRow name="Телефон" value="483248948" />
                            <BidRow name="Статус" value="На согласовании" />
                        </div>
                        <footer className={styles.footer}>
                            <Button variant="green">Принять</Button>
                            <Button variant="red">Отклонить</Button>
                        </footer>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default FullBid;

function BidRow({ name, value }: { name: string; value: string }) {
    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}:</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}
