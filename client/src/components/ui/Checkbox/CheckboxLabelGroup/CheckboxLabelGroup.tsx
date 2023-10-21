import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import styles from "./checkboxLabelGroup.module.scss";

interface Props {
    className?: string;
}

const CheckboxLabelGroup: FC<PropsWithChildren<Props>> = ({
    children,
    className,
}) => {
    return (
        <label className={cn(styles.group, className)}>
            {children}
        </label>
    );
};

export default CheckboxLabelGroup;
