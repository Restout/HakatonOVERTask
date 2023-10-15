import React from "react";

import cn from "classnames";

import styles from "./alert.module.scss";

type Props = {
    children: React.ReactNode;
    variant: "warning" | "success" | "error" | "info";
    className?: string;
};

const Alert: React.FC<Props> = ({ children, variant, className }) => {
    return (
        <div
            className={cn(styles.alert, styles[variant], className)}
            role="alert"
        >
            {children}
        </div>
    );
};

export default Alert;
