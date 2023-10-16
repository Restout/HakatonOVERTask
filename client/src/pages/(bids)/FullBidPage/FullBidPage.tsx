import { FC } from "react";

import { FullBid } from "components/bids/FullBid";

import styles from "./fullBidPage.module.scss";

const FullBidPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <FullBid />
        </div>
    );
};

export default FullBidPage;
