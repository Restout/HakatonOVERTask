import { FC } from "react";

import cn from "clsx";

import { Header } from "components/shared/Header";

import FullBid from "../../components/bids/FullBid/FullBid";
import styles from "./fullBidPage.module.scss";

const FullBidPage: FC = () => {
    return (
        <div className={styles.page}>
            <Header renderNav={() => <></>} />
            <main>
                <FullBid />
            </main>
        </div>
    );
};

export default FullBidPage;
