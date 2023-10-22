import { FC, FormEvent, MouseEvent, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";
import WithAuth from "hocs/WithAuth";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";

import { Button } from "components/ui/Button";
import { DeleteButton } from "components/ui/DeleteButton";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Textarea } from "components/ui/Textarea";

import FilesService from "services/FilesService";
import TasksService from "services/TasksService";

import { fetchFile } from "utils/downloadFile";
import { formatDate } from "utils/formatDate";

import { IMaterial, MaterialFileCategory } from "types/material.interface";
import { ITask } from "types/task.interface";

import { Role } from "constants/role.enum";
import { ANSWER_PATHNAME } from "constants/routesPathnames";

import book from "assets/img/icons/book.svg";
import fileSrc from "assets/img/icons/file.svg";
import studentCap from "assets/img/icons/student-cap.svg";
import task from "assets/img/icons/task.svg";
import work from "assets/img/icons/work.svg";

import styles from "./materialBlock.module.scss";

interface FileData {
    file: File;
    directory: MaterialFileCategory;
}

interface MaterialProps {
    deleteFile: (fileId: number) => void;
    material: IMaterial;
    createFile: (data: FileData) => void;
}

interface Props {
    isOpened: boolean;
    toggle: () => void;
    material: IMaterial;
}

const MaterialBlock: FC<Props> = ({ isOpened, toggle, material }) => {
    const queryClient = useQueryClient();

    const invalidateMaterials = () =>
        queryClient.invalidateQueries(["materials"]);

    const { mutate: postFile } = useMutation(
        (data: FormData) => FilesService.create(material.materialId, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["materials"]);
            },
        },
    );

    const createFile = (data: FileData) => {
        const { directory, file } = data;

        const formData = new FormData();

        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("directory", directory);

        postFile(formData);
    };

    const { mutate: deleteFile } = useMutation(
        (fileId: number) => FilesService.delete(fileId),
        {
            onSuccess: invalidateMaterials,
        },
    );

    return (
        <div className={styles.block}>
            <header
                className={cn(styles.header, isOpened && styles.active)}
                onClick={toggle}
            >
                <h3>{material.title}</h3>
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
                    <p className={styles.date}>
                        {formatDate(material.dateStart).date}
                        {" - "}
                        {formatDate(material.dateEnd).date}
                    </p>
                    <p className={styles.description}>{material.description}</p>
                    <div className={styles.subsections}>
                        <TheoreticalMaterials
                            material={material}
                            deleteFile={deleteFile}
                            createFile={createFile}
                        />
                        <PracticalMaterials
                            material={material}
                            deleteFile={deleteFile}
                            createFile={createFile}
                            invalidateMaterials={invalidateMaterials}
                        />
                        <SelfMaterials
                            material={material}
                            deleteFile={deleteFile}
                            createFile={createFile}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default MaterialBlock;

function PracticalMaterials({
    material,
    deleteFile,
    createFile,
    invalidateMaterials,
}: MaterialProps & { invalidateMaterials: () => void }) {
    const [isAddingMaterial, setIsAddingMaterial] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);

    const [file, setFile] = useState<File | null>(null);

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const { mutate: createTask } = useMutation(
        (data: Omit<ITask, "taskId">) =>
            TasksService.create(material.materialId, data),
        {
            onSuccess: () => {
                invalidateMaterials();
                setIsAddingTask(false);
            },
        },
    );

    const { mutate: deleteTask } = useMutation(
        (taskId: number) => TasksService.delete(taskId),
        {
            onSuccess: invalidateMaterials,
        },
    );

    const handleDeleteTask = (
        event: MouseEvent<HTMLButtonElement>,
        taskId: number,
    ) => {
        event.stopPropagation();
        deleteTask(taskId);
    };

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(null);
            return;
        }

        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmitMaterial = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) return;

        createFile({ file, directory: "Practical" });
        setIsAddingMaterial(false);
    };

    const handleSubmitTask = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = taskName.trim();
        const description = taskDescription.trim();

        if (name.length < 1 || description.length < 1) {
            return;
        }

        createTask({ answers: [], description, grade: -1, title: taskName });
        setIsAddingTask(false);
    };

    const handleDelete = (
        event: MouseEvent<HTMLButtonElement>,
        fileId: number,
    ) => {
        event.stopPropagation();
        deleteFile(fileId);
    };

    return (
        <div>
            <header className={styles.materialsHeader}>
                <h5>
                    <img src={task} alt="Задание" />
                    Практическое задание
                </h5>
            </header>
            <WithAuth
                authChildren={
                    <div className={styles.tasksHeadControls}>
                        <Button
                            variant="light-blue"
                            onClick={() => setIsAddingMaterial(true)}
                        >
                            Добавить материал
                        </Button>
                        <Button
                            variant="dark-blue"
                            onClick={() => setIsAddingTask(true)}
                        >
                            Добавить задание
                        </Button>
                    </div>
                }
                unAuthChildren={null}
                allowedRoles={[Role.ADMIN, Role.TEACHER]}
            />
            {isAddingMaterial && (
                <form
                    className={styles.controls}
                    onSubmit={handleSubmitMaterial}
                >
                    <Input onChange={handleSelectFile} type="file" />
                    <footer>
                        <Button variant="green" type="submit">
                            Добавить
                        </Button>
                        <Button
                            variant="red"
                            type="submit"
                            onClick={() => setIsAddingMaterial(false)}
                        >
                            Отменить
                        </Button>
                    </footer>
                </form>
            )}
            {isAddingTask && (
                <form className={styles.taskForm} onSubmit={handleSubmitTask}>
                    <div>
                        <FieldGroup className={styles.fieldGroup}>
                            <Label htmlFor="taskName">Название задания</Label>
                            <Input
                                required
                                type="text"
                                name="taskName"
                                placeholder="Название"
                                id="taskName"
                                value={taskName}
                                onChange={(event) =>
                                    setTaskName(event.target.value)
                                }
                            />
                        </FieldGroup>
                        <FieldGroup className={styles.fieldGroup}>
                            <Label htmlFor="taskDescription">
                                Описание задания
                            </Label>
                            <Textarea
                                required
                                name="taskDescription"
                                placeholder="Описание"
                                value={taskDescription}
                                id="taskDescription"
                                onChange={(event) =>
                                    setTaskDescription(event.target.value)
                                }
                            />
                        </FieldGroup>
                        <div className={styles.tasksControls}>
                            <Button variant="green" type="submit">
                                Добавить
                            </Button>
                            <Button
                                variant="red"
                                type="button"
                                onClick={() => setIsAddingTask(false)}
                            >
                                Отменить
                            </Button>
                        </div>
                    </div>
                </form>
            )}
            <ul>
                {material.practical.map(({ fileId, fileName }) => (
                    <li
                        key={fileId}
                        onClick={() => fetchFile(fileId, fileName)}
                    >
                        <img src={fileSrc} alt="Файл" />
                        <p>{fileName}</p>
                        <DeleteButton
                            className={styles.deleteBtn}
                            onClick={(event) => handleDelete(event, fileId)}
                        />
                    </li>
                ))}
                {material.tasks.map(({ taskId, title }) => (
                    <li key={taskId}>
                        <img src={book} alt="Задание" />
                        <Link to={`${ANSWER_PATHNAME}/${taskId}`}>{title}</Link>
                        <DeleteButton
                            className={styles.deleteBtn}
                            onClick={(event) => handleDeleteTask(event, taskId)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TheoreticalMaterials({
    material,
    deleteFile,
    createFile,
}: MaterialProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(null);
            return;
        }

        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) return;

        createFile({ file, directory: "Theoretical" });
        setIsAdding(false);
    };

    const handleDelete = (
        event: MouseEvent<HTMLButtonElement>,
        fileId: number,
    ) => {
        event.stopPropagation();
        deleteFile(fileId);
    };

    return (
        <div>
            <header className={styles.materialsHeader}>
                <h5>
                    <img src={studentCap} alt="Theory" />
                    Теоретические материалы
                </h5>
                <WithAuth
                    authChildren={
                        <Button
                            variant="dark-blue"
                            onClick={() => setIsAdding((prev) => !prev)}
                        >
                            {isAdding ? "Отменить" : "+"}
                        </Button>
                    }
                    unAuthChildren={null}
                    allowedRoles={[Role.ADMIN, Role.TEACHER]}
                />
            </header>
            {isAdding && (
                <form className={styles.controls} onSubmit={handleSubmit}>
                    {isAdding && (
                        <Input onChange={handleSelectFile} type="file" />
                    )}
                    <Button variant="green" type="submit">
                        Добавить
                    </Button>
                </form>
            )}
            <ul>
                {material.theoretical.map(({ fileId, fileName }) => (
                    <li
                        key={fileId}
                        onClick={() => fetchFile(fileId, fileName)}
                    >
                        <img src={fileSrc} alt="Файл" />
                        <p>{fileName}</p>
                        <DeleteButton
                            className={styles.deleteBtn}
                            onClick={(event) => handleDelete(event, fileId)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SelfMaterials({
    material,
    deleteFile,
    createFile,
}: MaterialProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(null);
            return;
        }

        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) return;

        setIsAdding(false);
        createFile({ file, directory: "Independent" });
    };

    const handleDelete = (
        event: MouseEvent<HTMLButtonElement>,
        fileId: number,
    ) => {
        event.stopPropagation();
        deleteFile(fileId);
    };

    return (
        <div>
            <header className={styles.materialsHeader}>
                <h5>
                    <img src={work} alt="Работа" />
                    Самостоятельная работа
                </h5>
                <WithAuth
                    authChildren={
                        <Button
                            variant="dark-blue"
                            onClick={() => setIsAdding((prev) => !prev)}
                        >
                            {isAdding ? "Отменить" : "+"}
                        </Button>
                    }
                    unAuthChildren={null}
                    allowedRoles={[Role.ADMIN, Role.TEACHER]}
                />
            </header>
            {isAdding && (
                <form className={styles.controls} onSubmit={handleSubmit}>
                    {isAdding && (
                        <Input onChange={handleSelectFile} type="file" />
                    )}
                    <Button variant="green" type="submit">
                        Добавить
                    </Button>
                </form>
            )}
            <ul>
                {material.independent.map(({ fileId, fileName }) => (
                    <li
                        key={fileId}
                        onClick={() => fetchFile(fileId, fileName)}
                    >
                        <img src={fileSrc} alt="Файл" />
                        <p>{fileName}</p>
                        <DeleteButton
                            className={styles.deleteBtn}
                            onClick={(event) => handleDelete(event, fileId)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
