import React from "react";

import cn from "clsx";

import deleteSrc from "assets/img/icons/delete.svg";

import styles from "./post.module.scss";

type PostProps = {
    title: string;
    date: string;
    src: string;
    text: string;
    isDisabled?: boolean;
    className?: string;
    onDeleteClick?: () => void;
};

const Post: React.FC<PostProps> = ({
    title,
    date,
    src,
    text,
    isDisabled,
    className,
    onDeleteClick,
}) => {
    return (
        <article
            className={cn(
                styles.post,
                isDisabled && styles.disabled,
                className,
            )}
        >
            <img src={src} alt={title} height={308} width={540} />
            <div className={styles.date}>{date}</div>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.text}>{text}</p>
            <button
                className={styles.deleteBtn}
                onClick={() => onDeleteClick?.()}
            >
                <img src={deleteSrc} alt="Удалить" />
            </button>
        </article>
    );
};

export default Post;
