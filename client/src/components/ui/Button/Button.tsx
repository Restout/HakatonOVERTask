import { ComponentProps, ElementType, ReactNode } from "react";

import cn from "clsx";

import styles from "./button.module.scss";

type ButtonCustomProps<E extends ElementType = ElementType> = {
    children: ReactNode;
    variant?: "light-blue" | "dark-blue" | "green" | "red";
    as?: E;
};

type ButtonProps<E extends ElementType> = ButtonCustomProps<E> &
    Omit<ComponentProps<E>, keyof ButtonCustomProps>;

const defaultElement = "button";

const Button = <E extends ElementType = typeof defaultElement>({
    children,
    className,
    as,
    variant = "dark-blue",
    ...rest
}: ButtonProps<E>) => {
    const TagName = as ?? defaultElement;
    return (
        <TagName
            className={cn(styles.button, styles[variant], className)}
            {...rest}
        >
            {children}
        </TagName>
    );
};

export default Button;
