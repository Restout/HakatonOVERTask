import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./title.module.scss";

interface Props {
    size?: "small" | "middle" | "large";
    className?: string;
}

const Title: FC<PropsWithChildren<Props>> = ({
    children,
    size = "large",
    className,
}) => {
    return (
        <h2 className={cn(styles.title, styles[size], className)}>
            {children}
        </h2>
    );
};

export default Title;
