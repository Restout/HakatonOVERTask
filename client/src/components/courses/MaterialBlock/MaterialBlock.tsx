import { FC } from "react";

import cn from "clsx";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";

import { ANSWER_PATHNAME, TEST_PATHNAME } from "constants/routesPathnames";

import book from "assets/img/icons/book.svg";
import file from "assets/img/icons/file.svg";
import link from "assets/img/icons/link.svg";
import practice from "assets/img/icons/practice.svg";
import studentCap from "assets/img/icons/student-cap.svg";
import task from "assets/img/icons/task.svg";
import work from "assets/img/icons/work.svg";

import styles from "./materialBlock.module.scss";

interface Props {
    isOpened: boolean;
    toggle: () => void;
}

const MaterialBlock: FC<Props> = ({ isOpened, toggle }) => {
    return (
        <div className={styles.block}>
            <header
                className={cn(styles.header, isOpened && styles.active)}
                onClick={toggle}
            >
                <h3>1. Верстка сайта</h3>
                <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#000000"
                        fillRule="evenodd"
                        d="M12.2929,5.292875 C12.6834,4.902375 13.3166,4.902375 13.7071,5.292875 C14.0976,5.683375 14.0976,6.316555 13.7071,6.707085 L8.70711,11.707085 C8.31658,12.097605 7.68342,12.097605 7.29289,11.707085 L2.29289,6.707085 C1.90237,6.316555 1.90237,5.683375 2.29289,5.292875 C2.68342,4.902375 3.31658,4.902375 3.70711,5.292875 L8,9.585765 L12.2929,5.292875 Z"
                    />
                </svg>
            </header>
            <Collapse isOpened={isOpened} className={styles.collapseContainer}>
                <div className={styles.content}>
                    <p className={styles.date}>28 August - 3 September</p>
                    <p className={styles.description}>
                        Общие понятия верстки сайта.
                    </p>
                    <div className={styles.subsections}>
                        <div>
                            <h5>
                                <img src={studentCap} alt="Theory" />
                                Теоретические материалы
                            </h5>
                            <ul>
                                <li>
                                    <img src={link} alt="Ссылка" />
                                    <a
                                        href="https://habr.com/ru/articles/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Статья о верстке
                                    </a>
                                </li>
                                <li>
                                    <img src={file} alt="Файл" />
                                    <p>Filename.pdf</p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5>
                                <img src={task} alt="Задание" />
                                Практическое задание
                            </h5>
                            <ul>
                                <li>
                                    <img src={practice} alt="Тест" />
                                    <Link to={`${TEST_PATHNAME}/${1432}`}>
                                        Тест по теории
                                    </Link>
                                </li>
                                <li>
                                    <img src={book} alt="Задание" />
                                    <Link to={`${ANSWER_PATHNAME}/${4324}`}>
                                        Сверстать картинку
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5>
                                <img src={work} alt="Работа" />
                                Самостоятельная работа
                            </h5>
                            <ul>
                                <li>
                                    <img src={link} alt="Ссылка" />
                                    <a
                                        href="https://habr.com/ru/articles/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Сверстать сайт
                                    </a>
                                </li>
                                <li>
                                    <img src={link} alt="Ссылка" />
                                    <a
                                        href="https://habr.com/ru/articles/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Сверстать картинку
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default MaterialBlock;
