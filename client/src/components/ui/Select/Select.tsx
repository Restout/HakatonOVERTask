import { SelectHTMLAttributes, forwardRef } from "react";

import cn from "clsx";

import styles from "./select.module.scss";

export interface Option<V = string, L = string> {
    value: V;
    label: L;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, Props>(
    ({ children, className, ...rest }, ref) => {
        return (
            <select
                {...rest}
                ref={ref}
                className={cn(styles.select, className)}
            >
                {children}
            </select>
        );
    },
);

export default Select;
