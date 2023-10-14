import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./inputGroup.module.scss";

interface Props {
    className?: string;
}

const InputGroup: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={cn(styles.group, className)}>{children}</div>;
};

export default InputGroup;
