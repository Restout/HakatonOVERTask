import { FC } from "react";

import cn from "clsx";

import { ButtonTab } from "components/ui/ButtonTab";

import styles from "./bidsFilter.module.scss";

interface Props {
    className?: string;
}

const BidsFilter: FC<Props> = ({ className }) => {
    return (
        <div className={cn(styles.filter, className)}>
            <div className={styles.tabs}>
                <ButtonTab className={styles.btn} isActive={true}>
                    Все
                </ButtonTab>
                <ButtonTab className={styles.btn} isActive={false}>
                    На согласовании
                </ButtonTab>
                <ButtonTab className={styles.btn} isActive={true}>
                    Отклонена
                </ButtonTab>
                <ButtonTab className={styles.btn} isActive={false}>
                    Зарегистрирована
                </ButtonTab>
            </div>
        </div>
    );
};

export default BidsFilter;
