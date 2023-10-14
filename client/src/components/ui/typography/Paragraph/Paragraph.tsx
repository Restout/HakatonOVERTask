import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./paragraph.module.scss";

interface Props {
    size?: "small" | "default";
    className?: string;
}

const Paragraph: FC<PropsWithChildren<Props>> = ({
    children,
    className,
    size = "default",
}) => {
    return (
        <p className={cn(styles.paragraph, styles[size], className)}>
            {children}
        </p>
    );
};

export default Paragraph;
