import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./fieldGroup.module.scss";

interface Props {
    className?: string;
}

const FieldGroup: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={cn(styles.group, className)}>{children}</div>;
};

export default FieldGroup;
