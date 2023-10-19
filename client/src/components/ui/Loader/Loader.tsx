import { FC } from "react";

import cn from "clsx";

import styles from "./loader.module.scss";

interface Props {
    isCenter?: boolean;
    className?: string;
}

const Loader: FC<Props> = ({ className, isCenter }) => {
    return (
        <span
            className={cn(styles.loader, isCenter && styles.center, className)}
        />
    );
};

export default Loader;
