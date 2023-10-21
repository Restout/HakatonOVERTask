import { FC, InputHTMLAttributes } from "react";

import cn from "clsx";

import checkSrc from "assets/img/icons/check.svg";

import styles from "./checkbox.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: FC<Props> = ({ checked, className, ...rest }) => {
    return (
        <>
            <input type="checkbox" className="visually-hidden" {...rest} />
            <span
                className={cn(
                    styles.checkbox,
                    checked && styles.checked,
                    className,
                )}
            >
                {checked && (
                    <img
                        className={styles.checkIcon}
                        src={checkSrc}
                        alt="Выбрано"
                    />
                )}
            </span>
        </>
    );
};

export default Checkbox;
