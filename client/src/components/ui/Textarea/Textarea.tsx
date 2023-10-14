import { TextareaHTMLAttributes, forwardRef } from "react";

import cn from "clsx";

import styles from "./textarea.module.scss";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
    ({ className, ...rest }, ref) => {
        return (
            <textarea
                className={cn(styles.textarea, className)}
                {...rest}
                ref={ref}
            />
        );
    },
);

export default Textarea;
