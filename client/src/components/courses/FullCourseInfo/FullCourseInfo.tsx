import { FC, FormEvent, useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import WithAuth from "hocs/WithAuth";

import { CourseForm, CourseFormState } from "components/courses/CourseForm";
import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import ApplicationsService from "services/ApplicationsService";
import GroupsService from "services/GroupsService";

import { checkEmptyValidity } from "utils/checkEmptyValidity";

import { ApplicationDTO } from "types/application.interface";
import { ICourse } from "types/course.interface";
import { GroupDTO } from "types/group.interface";

import { Role } from "constants/role.enum";

import styles from "./fullCourseInfo.module.scss";

interface Props {
    closeEnrol: () => void;
    isEnrolling: boolean;
    course: ICourse;
}

const FullCourseInfo: FC<Props> = ({ closeEnrol, isEnrolling, course }) => {
    const user = useTypedSelector((state) => state.user.user);
    const queryClient = useQueryClient();

    const { mutate, isSuccess, isError, isLoading } = useMutation(
        (data: ApplicationDTO) => ApplicationsService.create(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["bids"]);
            },
        },
    );

    const handleEnrol = (data: CourseFormState) => {
        const chiefName = data.chiefName.trim();
        const chiefLastName = data.chiefLastName.trim();
        const chiefFatherName = data.chiefFatherName.trim();
        const currentPosition = data.currentPosition.trim();
        const departmentName = data.departmentName.trim();
        const experience = data.experience.trim();
        const merits = data.merits.trim();
        const motivationLetter = data.motivationLetter.trim();

        if (
            !checkEmptyValidity([
                chiefName,
                chiefFatherName,
                chiefLastName,
                currentPosition,
                departmentName,
                experience,
                merits,
                motivationLetter,
            ]) ||
            !user
        ) {
            return;
        }

        const newBid: ApplicationDTO = {
            chiefName: `${chiefLastName} ${chiefName} ${chiefFatherName}`,
            currentPosition,
            departmentName,
            experience: parseInt(experience),
            merits,
            motivationLetter,
            courseID: course.courseId,
            ID: user.id,
        };

        mutate(newBid);
    };

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.wrapper}>
                    <div>
                        {isEnrolling && (
                            <div className={styles.enrolling}>
                                <h4>Запись на курс</h4>
                                {isError && (
                                    <Alert
                                        className={styles.alert}
                                        variant="error"
                                    >
                                        Что-пошло не так, попробуйте еще раз
                                    </Alert>
                                )}
                                {isSuccess && (
                                    <Alert
                                        className={styles.alert}
                                        variant="success"
                                    >
                                        Заявка успешно подана. Отслеживать ее
                                        статус вы можете в личном кабинете.
                                    </Alert>
                                )}
                                {!isSuccess && (
                                    <CourseForm
                                        onSubmit={handleEnrol}
                                        closeForm={closeEnrol}
                                        isDisabled={isLoading}
                                    />
                                )}
                            </div>
                        )}
                        <Subsection title="О курсе" content={course.about} />
                        <Subsection
                            title="Программа курса"
                            content={course.programm}
                        />
                        <Subsection
                            title="Требования"
                            content={course.requirements}
                        />
                        <Subsection
                            title="Результаты обучения"
                            content={course.requirements}
                        />
                    </div>
                    {user && (
                        <WithAuth
                            authChildren={
                                <Groups
                                    courseId={course.courseId}
                                    userId={user.id}
                                    role={user.role}
                                />
                            }
                            unAuthChildren={null}
                            allowedRoles={[Role.ADMIN, Role.SUPERVISOR]}
                        />
                    )}
                </div>
            </Container>
        </section>
    );
};

export default FullCourseInfo;

function Groups({
    courseId,
    userId,
    role,
}: {
    courseId: number;
    userId: number;
    role: Role;
}) {
    const [isAdding, setIsAdding] = useState(false);

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryFn: () => GroupsService.getAll(courseId),
        queryKey: ["groups", courseId],
        select: (response) => response.data,
    });

    return (
        <div className={styles.groups}>
            <div>
                <header>
                    <h5>Учебные группы</h5>
                    <Button
                        variant="dark-blue"
                        onClick={() => setIsAdding((prev) => !prev)}
                    >
                        {isAdding ? "-" : "+"}
                    </Button>
                </header>
                {isAdding && (
                    <GroupForm
                        courseId={courseId}
                        userId={userId}
                        close={() => setIsAdding(false)}
                        role={role}
                    />
                )}
                {isError && (
                    <Alert variant="error">
                        Что-то пошло не так, попробуйте еще раз позже
                    </Alert>
                )}
                {isSuccess && data.length < 1 && (
                    <Alert variant="info">Ни одна группа не прикреплена</Alert>
                )}
                {isLoading && <Loader isCenter={true} />}
                {isSuccess && data.length > 0 && (
                    <ul>
                        {data.map((group) => (
                            <li>{group.groupName}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function GroupForm({
    courseId,
    userId,
    close,
    role,
}: {
    courseId: number;
    userId: number;
    close: () => void;
    role: Role;
}) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const isAdmin = role === Role.ADMIN;

    const { mutate, isLoading, isError } = useMutation(
        (data: GroupDTO) => GroupsService.post(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["groups", courseId]);
                close();
            },
        },
    );

    useEffect(() => {
        if (isError) {
            setError("Что-то пошло не так, попробуйте еще раз");
        } else {
            setError(null);
        }
    }, [isError]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (isAdmin && id.trim().length < 1) {
            setError("Введите идентификатор");
            return;
        }

        if (name.trim().length < 1) {
            setError("Название не может быть пустым");
            return;
        }

        const data: GroupDTO = {
            courseId,
            supervisiorId: isAdmin ? parseInt(id) : userId,
            groupName: name,
        };

        mutate(data);
    };

    return (
        <form className={styles.groupForm} onSubmit={handleSubmit}>
            {error && (
                <Alert className={styles.formAlert} variant="error">
                    {error}
                </Alert>
            )}
            <FieldGroup className={styles.groupField}>
                <Input
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    name="name"
                    required={true}
                    disabled={isLoading}
                    placeholder="Название/номер"
                />
            </FieldGroup>
            <WithAuth
                authChildren={
                    <FieldGroup className={styles.groupField}>
                        <Input
                            onChange={(event) => setId(event.target.value)}
                            value={id}
                            name="id"
                            required={true}
                            disabled={isLoading}
                            placeholder="Идентификатор куратора"
                        />
                    </FieldGroup>
                }
                unAuthChildren={null}
                allowedRoles={[Role.ADMIN]}
            />
            <Button
                className={styles.groupSubmitBtn}
                variant="green"
                type="submit"
                disabled={isLoading}
            >
                Создать
            </Button>
        </form>
    );
}

function Subsection({ title, content }: { title: string; content: string }) {
    return (
        <div className={styles.subsection}>
            <Title className={styles.subsectionTitle} size="middle">
                {title}
            </Title>
            <p>{content}</p>
        </div>
    );
}
