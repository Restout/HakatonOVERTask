import { FC } from "react";

import { Groups } from "components/screens/schedule/Groups";
import { Header } from "components/shared/Header";

import styles from "./groupsPage.module.scss";

const GroupsPage: FC = () => {
    return (
        <div>
            <Header renderNav={() => <></>} />
            <Groups />
        </div>
    );
};

export default GroupsPage;
