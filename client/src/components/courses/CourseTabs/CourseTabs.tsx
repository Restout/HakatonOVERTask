import { FC } from "react";

import cn from "clsx";

import styles from "./courseTabs.module.scss";

interface Props {
    activeTab: number;
    tabClick: (number: number) => void;
}

const tabs = ["Информация", "Предметы"];

const CourseTabs: FC<Props> = ({ activeTab, tabClick }) => {
    return (
        <div className={styles.tabs}>
            <ul>
                {tabs.map((tab, index) => (
                    <li key={index}>
                        <button
                            className={cn(activeTab === index && styles.active)}
                            onClick={() => tabClick(index)}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseTabs;
