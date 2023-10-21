import { FC, MouseEvent } from "react";

import cn from "clsx";

import deleteSrc from "assets/img/icons/delete.svg";

import styles from "./deleteButton.module.scss";

interface Props {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const DeleteButton: FC<Props> = ({ className, onClick }) => {
    return (
        <button className={cn(styles.deleteBtn, className)} onClick={onClick}>
            <img src={deleteSrc} alt="Удалить" />
        </button>
    );
};

export default DeleteButton;
