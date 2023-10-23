import { FC, FormEvent, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Loader } from "components/ui/Loader";

import FilesService from "services/FilesService";
import TasksService from "services/TasksService";

import { fetchFile } from "utils/downloadFile";

import { ITask } from "types/task.interface";

import fileSrc from "assets/img/icons/file.svg";

import styles from "./answerPage.module.scss";

const AnswerPage: FC = () => {
    const { taskId = "" } = useParams();
    const [isAdding, setIsAdding] = useState(false);
    const [isGrading, setIsGrading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const queryClient = useQueryClient();
    const [grade, setGrade] = useState("");
    const [gradeError, setGradeError] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const {
        data: task,
        isSuccess,
        isLoading: isTaskLoading,
        isError,
    } = useQuery({
        queryFn: () => TasksService.get(parseInt(taskId)),
        queryKey: ["tasks", taskId],
        select: (data) => data.data,
    });

    const { mutate: addAnswer, isLoading: isAnswerLoading } = useMutation(
        (data: FormData) => FilesService.createAnswer(parseInt(taskId), data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["tasks", taskId]);
                setIsAdding(false);
                setFile(null);
            },
            onError: () => {
                setFileError("Что-то пошло не так, попробуйте еще раз");
            },
        },
    );

    const { mutate: addGrade, isLoading: isGradeLoading } = useMutation(
        (task: ITask) => TasksService.update(task),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["tasks", taskId]);
                setIsGrading(false);
                setGrade("");
            },
            onError: () => {
                setGradeError("Что-то пошло не так, попробуйте еще раз");
            },
        },
    );

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(null);
            return;
        }

        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmitAnswer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFileError(null);

        if (!file) {
            setFileError("Выберите файл");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("directory", "Task");

        addAnswer(formData);
    };

    const handleSubmitGrade = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setGradeError(null);

        if (!task) {
            return;
        }

        const trimmedGrade = grade.trim();

        if (trimmedGrade.length < 1) {
            setGradeError("Заполните поле");
            return;
        }

        const numberGrade = parseInt(trimmedGrade);

        if (numberGrade < 0) {
            setGradeError("Оценка не может быть меньше 0");
            return;
        }

        if (numberGrade > 100) {
            setGradeError("Оценка не может быть больше 100");
            return;
        }

        const updatedTask: ITask = {
            ...task,
            answers: [],
            grade: numberGrade,
        };

        addGrade(updatedTask);
    };

    return (
        <section className={styles.section}>
            <Meta />
            <Container>
                <Loading isLoading={isTaskLoading} />
                <Error isError={isError} />
                {isSuccess && (
                    <div className={styles.body}>
                        <header>
                            <h1>Задание: {task.title}</h1>
                            <p>{task.description}</p>
                        </header>
                        <div className={styles.content}>
                            <div>
                                <div className={styles.row}>
                                    <h5>Ответы:</h5>
                                    {task.answers.length < 1 && (
                                        <p>Ответ еще не предоставлен</p>
                                    )}
                                    {task.answers.length > 0 && (
                                        <ul>
                                            {task.answers.map(
                                                ({ fileId, fileName }) => (
                                                    <li
                                                        key={fileId}
                                                        onClick={() =>
                                                            fetchFile(
                                                                fileId,
                                                                fileName,
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={fileSrc}
                                                            alt="Файл"
                                                        />
                                                        <p>{fileName}</p>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </div>
                                <div className={styles.row}>
                                    <h5>Оценка:</h5>
                                    {task.grade !== -1 && (
                                        <div className={styles.grade}>
                                            {task.grade}/100
                                        </div>
                                    )}
                                    {task.grade === -1 && <div>Нет оценки</div>}
                                </div>
                            </div>
                            {!isAdding && (
                                <Button
                                    className={styles.answerBtn}
                                    variant="light-blue"
                                    disabled={isAnswerLoading}
                                    onClick={() => setIsAdding(true)}
                                >
                                    Добавить ответ
                                </Button>
                            )}
                            {isAdding && (
                                <form
                                    className={styles.form}
                                    onSubmit={handleSubmitAnswer}
                                    onChange={() => setFileError(null)}
                                >
                                    <FieldGroup>
                                        <Label
                                            htmlFor="file"
                                            isRequired={true}
                                            className={styles.label}
                                        >
                                            Ваш ответ
                                        </Label>
                                        <Input
                                            onChange={handleSelectFile}
                                            type="file"
                                            id="file"
                                            disabled={isAnswerLoading}
                                        />
                                        {fileError && (
                                            <FieldError>{fileError}</FieldError>
                                        )}
                                    </FieldGroup>
                                    <div className={styles.formControls}>
                                        <Button
                                            className={styles.answerBtn}
                                            variant="green"
                                            type="submit"
                                            disabled={isAnswerLoading}
                                        >
                                            Сохранить
                                        </Button>
                                        <Button
                                            className={styles.answerBtn}
                                            variant="light-blue"
                                            type="button"
                                            disabled={isAnswerLoading}
                                            onClick={() => setIsAdding(false)}
                                        >
                                            Отменить
                                        </Button>
                                    </div>
                                </form>
                            )}
                            {!isGrading && task.answers.length > 0 && (
                                <Button
                                    className={styles.answerBtn}
                                    variant="light-blue"
                                    onClick={() => setIsGrading(true)}
                                >
                                    Оценить
                                </Button>
                            )}
                            {isGrading && (
                                <form
                                    className={styles.form}
                                    onSubmit={handleSubmitGrade}
                                    onChange={() => setGradeError(null)}
                                >
                                    <FieldGroup>
                                        <Label
                                            htmlFor="grade"
                                            isRequired={true}
                                            className={styles.label}
                                        >
                                            Оценка за ответ
                                        </Label>
                                        <Input
                                            value={grade}
                                            onChange={(event) =>
                                                setGrade(event.target.value)
                                            }
                                            type="text"
                                            placeholder="Оценка"
                                            id="grade"
                                            disabled={isGradeLoading}
                                        />
                                        {gradeError && (
                                            <FieldError>
                                                {gradeError}
                                            </FieldError>
                                        )}
                                    </FieldGroup>
                                    <div className={styles.formControls}>
                                        <Button
                                            className={styles.answerBtn}
                                            variant="green"
                                            type="submit"
                                            disabled={isGradeLoading}
                                        >
                                            Сохранить
                                        </Button>
                                        <Button
                                            className={styles.answerBtn}
                                            variant="light-blue"
                                            type="button"
                                            disabled={isGradeLoading}
                                            onClick={() => {
                                                setIsGrading(false);
                                                setGrade("");
                                                setGradeError(null);
                                            }}
                                        >
                                            Отменить
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default AnswerPage;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) {
        return null;
    }

    return <Loader isCenter={true} />;
}

function Error({ isError }: { isError: boolean }) {
    if (!isError) {
        return null;
    }

    return (
        <Alert variant="error">Что-то пошло не так, попробуйте еще раз</Alert>
    );
}

function Meta() {
    return (
        <Helmet>
            <title>Answer</title>
            <meta name="description" content="Страница загрузки ответов" />
        </Helmet>
    );
}
