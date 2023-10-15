import { FC } from "react";

import { Bids } from "components/bids/Bids";
import { Header } from "components/shared/Header";

import styles from "./bidsPage.module.scss";

const BidsPage: FC = () => {
    return (
        <div className={styles.page}>
            <Header renderNav={() => <></>} />
            <main>
                <Bids />
            </main>
        </div>
    );
};

export default BidsPage;
