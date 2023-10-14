import { ComponentProps, ElementType, ReactNode } from "react";

import cn from "clsx";

import styles from "./button.module.scss";

type ButtonCustomProps<E extends ElementType = ElementType> = {
    children: ReactNode;
    variant?: "dark" | "light";
    as?: E;
};

type ButtonProps<E extends ElementType> = ButtonCustomProps<E> &
    Omit<ComponentProps<E>, keyof ButtonCustomProps>;

const defaultElement = "button";

const Button = <E extends ElementType = typeof defaultElement>({
    children,
    className,
    as,
    variant = "light",
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
