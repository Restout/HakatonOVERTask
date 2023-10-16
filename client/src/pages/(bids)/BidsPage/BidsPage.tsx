import { FC } from "react";

import { Bids } from "components/bids/Bids";

import styles from "./bidsPage.module.scss";

const BidsPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Bids />
        </div>
    );
};

export default BidsPage;
