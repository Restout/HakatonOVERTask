import { FC, LabelHTMLAttributes } from "react";

import cn from "clsx";

import styles from "./label.module.scss";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    isRequired?: boolean;
}

const Label: FC<Props> = ({ className, children, isRequired, ...rest }) => {
    return (
        <label className={cn(styles.label, className)} {...rest}>
            {children}
            {isRequired && <span>*</span>}
        </label>
    );
};

export default Label;
