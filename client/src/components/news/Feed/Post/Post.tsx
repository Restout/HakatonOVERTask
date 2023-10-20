import React from "react";

import cn from "clsx";
import WithAuth from "hocs/WithAuth";
import { useLocation } from "react-router-dom";

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
    const location = useLocation();
    const isAdminPage = location.pathname.includes("admin");
    return (
        <article
            className={cn(
                styles.post,
                isDisabled && styles.disabled,
                className,
            )}
        >
            <div className={styles.imageWrapper}>
                <img src={src} alt={title} height={178} width={267} />
            </div>
            <div className={styles.date}>{date}</div>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.text}>{text}</p>
            {isAdminPage && (
                <WithAuth
                    authChildren={
                        <button
                            className={styles.deleteBtn}
                            onClick={() => onDeleteClick?.()}
                        >
                            <img src={deleteSrc} alt="Удалить" />
                        </button>
                    }
                    unAuthChildren={null}
                />
            )}
        </article>
    );
};

export default Post;
