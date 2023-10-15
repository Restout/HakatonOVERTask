import { forwardRef } from "react";

import cn from "clsx";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./dateInput.module.scss";

const DateInput = forwardRef<HTMLInputElement, ReactDatePickerProps>(
    ({ onChange, selected, className, ...rest }, ref) => {
        return (
            <DatePicker
                className={cn(styles.dateInput, className)}
                wrapperClassName={styles.wrapper}
                selected={selected}
                onChange={onChange}
                {...rest}
            />
        );
    },
);

export default DateInput;
