import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./fieldRow.module.scss";

interface Props {
    className?: string;
}

const FieldGroup: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={cn(styles.row, className)}>{children}</div>;
};

export default FieldGroup;
