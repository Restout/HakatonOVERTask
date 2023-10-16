import { FC } from "react";

import { FullUser } from "components/users/FullUser";

import styles from "./fullUserPage.module.scss";

const FullUserPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <FullUser />
        </div>
    );
};

export default FullUserPage;
