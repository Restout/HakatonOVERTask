import React from "react";

import cn from "clsx";

import styles from "./post.module.scss";

type PostProps = {
    title: string;
    date: string;
    src: string;
    text: string;
    className?: string;
};

const Post: React.FC<PostProps> = ({ title, date, src, text, className }) => {
    return (
        <article className={cn(styles.post, className)}>
            <img src={src} alt={title} height={308} width={540} />
            <div className={styles.date}>{date}</div>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.text}>{text}</p>
        </article>
    );
};

export default Post;
