import { FC } from "react";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import { BidsFilter } from "../BidsFilter";
import { BidsTable } from "../BidsTable";
import styles from "./bids.module.scss";

const Bids: FC = () => {
    return (
        <section>
            <Container>
                <Title className={styles.title}>Заявки</Title>
                <BidsFilter className={styles.filter} />
                <BidsTable />
            </Container>
        </section>
    );
};

export default Bids;
