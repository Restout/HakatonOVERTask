import { FC } from "react";

import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./dateInput.module.scss";

const DateInput: FC<ReactDatePickerProps> = ({ onChange, selected }) => {
    return (
        <DatePicker
            className={styles.input}
            wrapperClassName={styles.wrapper}
            selected={selected}
            onChange={onChange}
        />
    );
};

export default DateInput;
