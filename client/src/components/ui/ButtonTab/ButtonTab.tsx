import { ButtonHTMLAttributes, FC } from "react";

import cn from "clsx";

import styles from "./buttonTab.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
}

const ButtonTab: FC<Props> = ({ isActive, className, children, ...rest }) => {
    return (
        <button
            className={cn(styles.button, isActive && styles.active, className)}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
};

export default ButtonTab;
