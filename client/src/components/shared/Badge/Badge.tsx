import { FC, ReactNode } from "react";

import cn from "clsx";

import styles from "./badge.module.scss";

interface Props {
    children: ReactNode;
    className?: string;
    variant: "warning" | "danger" | "success";
}

const Badge: FC<Props> = ({ children, variant, className }) => {
    return (
        <span className={cn(styles.badge, styles[variant], className)}>
            {children}
        </span>
    );
};

export default Badge;
