import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./fieldError.module.scss";

interface Props {
    className?: string;
}

const FieldError: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <p className={cn(styles.error, className)} role="alert">
            {children}
        </p>
    );
};

export default FieldError;
