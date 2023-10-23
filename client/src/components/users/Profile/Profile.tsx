import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import UserService from "services/UserService";

import { formatDate } from "utils/formatDate";

import { IStudent, ITeacher, IUser } from "types/user.interface";

import { Role } from "constants/role.enum";

import styles from "./profile.module.scss";

const Profile: FC = () => {
    const { id: userId, role } = useTypedSelector(
        (state) => state.user.user,
    ) as IUser;

    const usersRoles = [
        Role.ADMIN,
        Role.ENROLLEE,
        Role.MANAGER,
        Role.SELLECTION_COMMITE,
        Role.SUPERVISOR,
    ];

    const {
        data: user,
        isSuccess: isUserSuccess,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useQuery({
        queryFn: () => {
            return UserService.getUserById(userId);
        },
        queryKey: ["users", userId],
        select: (data) => data.data,
        enabled: usersRoles.includes(role),
    });

    const {
        data: student,
        isSuccess: isStudentSuccess,
        isLoading: isStudentLoading,
        isError: isStudentError,
    } = useQuery({
        queryFn: () => {
            return UserService.getStudent(userId);
        },
        queryKey: ["students", userId],
        select: (data) => data.data,
        enabled: role === Role.STUDENT,
    });

    const {
        data: teacher,
        isSuccess: isTeacherSuccess,
        isLoading: isTeacherLoading,
        isError: isTeacherError,
    } = useQuery({
        queryFn: () => {
            return UserService.getTeacher(userId);
        },
        queryKey: ["teachers", userId],
        select: (data) => data.data,
        enabled: role === Role.TEACHER,
    });

    const isLoading = isStudentLoading && isTeacherLoading && isUserLoading;
    const isError = isStudentError || isTeacherError || isUserError;

    return (
        <section className={styles.section}>
            <Meta />
            <Container>
                <div className={styles.body}>
                    {isTeacherSuccess && (
                        <>
                            <Teacher teacher={teacher} />
                        </>
                    )}
                    {isStudentSuccess && (
                        <>
                            <Student student={student} />
                        </>
                    )}
                    {isUserSuccess && (
                        <>
                            <User user={user} />
                        </>
                    )}
                    {isLoading && <Loader isCenter={true} />}
                    {isError && (
                        <Alert variant="error">
                            Что-то пошло не так, попробуйте еще раз
                        </Alert>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default Profile;

function User({ user }: { user: IUser }) {
    const { birthday, email, fatherName, firstName, lastName, phone } = user;
    return (
        <>
            <header className={styles.header}>
                <Title>
                    {lastName} {firstName} {fatherName}
                </Title>
            </header>
            <div className={styles.wrapper}>
                <Title className={styles.subtitle} size="middle">
                    Информация
                </Title>
                <ProfileRow name="Телефон" value={phone} />
                <ProfileRow name="Email" value={email} />
                <ProfileRow
                    name="Дата рождения"
                    value={formatDate(birthday).date}
                />
            </div>
        </>
    );
}

function Student({ student }: { student: IStudent }) {
    const { birthday, email, fatherName, firstName, lastName, phone, groupID } =
        student;
    return (
        <>
            <header className={styles.header}>
                <Title>
                    {lastName} {firstName} {fatherName}
                </Title>
            </header>
            <div className={styles.wrapper}>
                <Title className={styles.subtitle} size="middle">
                    Информация
                </Title>
                <ProfileRow name="Телефон" value={phone} />
                <ProfileRow name="Email" value={email} />
                <ProfileRow
                    name="Дата рождения"
                    value={formatDate(birthday).date}
                />
                <ProfileRow name="Номер группы" value={String(groupID)} />
            </div>
        </>
    );
}

function Teacher({ teacher }: { teacher: ITeacher }) {
    const {
        academicDegree,
        academicTitle,
        birthday,
        email,
        fatherName,
        firstName,
        lastName,
        phone,
    } = teacher;
    return (
        <>
            <header className={styles.header}>
                <Title>
                    {lastName} {firstName} {fatherName}
                </Title>
            </header>
            <div className={styles.wrapper}>
                <Title className={styles.subtitle} size="middle">
                    Информация
                </Title>
                <ProfileRow name="Телефон" value={phone} />
                <ProfileRow name="Email" value={email} />
                <ProfileRow
                    name="Дата рождения"
                    value={formatDate(birthday).date}
                />
                <ProfileRow name="Ученое звание" value={academicTitle} />
                <ProfileRow name="Ученая степень" value={academicDegree} />
            </div>
        </>
    );
}

function ProfileRow({ name, value }: { name: string; value: string }) {
    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}:</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}

function Meta() {
    return (
        <Helmet>
            <title>Profile</title>
            <meta name="description" content="Страница профиля" />
        </Helmet>
    );
}
