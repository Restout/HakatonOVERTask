import { FC } from "react";

import { useParams } from "react-router-dom";

import { Schedule } from "components/screens/schedule/Schedule";
import { Header } from "components/shared/Header";

import styles from "./schedulePage.module.scss";

const SchedulePage: FC = () => {
    const { groupId } = useParams();

    if (!groupId) return null;

    return (
        <div>
            <Header renderNav={() => <></>} />
            <main>
                <Schedule groupId={groupId} />
            </main>
        </div>
    );
};

export default SchedulePage;
