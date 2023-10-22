import { FC, Fragment, ReactNode, useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";
import WithAuth from "hocs/WithAuth";
import { useLocation, useNavigate } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { Loader } from "components/ui/Loader";
import { Option, Select } from "components/ui/Select";

import { useAuth } from "hooks/auth/useAuth";

import ApplicationsService from "services/ApplicationsService";
import GroupsService from "services/GroupsService";
import UserService from "services/UserService";

import { formatDate } from "utils/formatDate";

import { IApplicationInfo } from "types/application.interface";

import { BidStatus } from "constants/bidsStatus";
import { Role } from "constants/role.enum";

import styles from "./fullBid.module.scss";

type BidOption = Option<BidStatus, string>;

const options: BidOption[] = [
    {
        value: BidStatus.FOR_APPROVAL,
        label: "На согласовании",
    },
    {
        value: BidStatus.REGISTERED,
        label: "Зарегистрирована",
    },
    {
        value: BidStatus.REJECTED,
        label: "Отклонена",
    },
    {
        value: BidStatus.UNDER_CONSIDERATION,
        label: "На рассмотрении",
    },
];

interface Props {
    bid: IApplicationInfo;
    isFetching: boolean;
}

const FullBid: FC<Props> = ({ bid, isFetching }) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();
    const [isChoosing, setIsChoosing] = useState(false);

    const location = useLocation();
    const isAdmin = location.pathname.includes("admin");

    const option =
        options.find((option) => option.value === bid.status) ?? options[0];

    const [status, setStatus] = useState(() => option.value);

    const { mutate } = useMutation(
        () => {
            setError(null);
            return ApplicationsService.updateStatus(bid.applicationID, status);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["bids"]);
                setIsEditing(false);
            },
            onError: () => {
                setError("Не удалось изменить заявку, попробуйте еще раз");
            },
        },
    );

    return (
        <div className={styles.wrapper}>
            <div className={cn(styles.bid, isFetching && styles.opacity)}>
                <Container>
                    <div className={styles.body}>
                        {!isChoosing && (
                            <>
                                <header className={styles.header}>
                                    <h5>Заявка №{bid.applicationID}</h5>
                                    {isAdmin && (
                                        <button onClick={() => navigate(-1)}>
                                            Все заявки
                                        </button>
                                    )}
                                </header>
                                <div className={styles.description}>
                                    {error && (
                                        <Alert
                                            className={styles.errorAlert}
                                            variant="error"
                                        >
                                            {error}
                                        </Alert>
                                    )}
                                    <BidRow
                                        name="Дата"
                                        value={
                                            formatDate(bid.dateOfChange).date
                                        }
                                    />
                                    <BidRow
                                        name="Фамилия"
                                        value={bid.lastName}
                                    />
                                    <BidRow name="Имя" value={bid.firstName} />
                                    <BidRow
                                        name="Отчество"
                                        value={bid.fatherName}
                                    />
                                    <BidRow
                                        name="Должность"
                                        value={bid.currentPosition}
                                    />
                                    <BidRow
                                        name="Подразделение"
                                        value={bid.departmentName}
                                    />
                                    <BidRow
                                        name="Руководитель"
                                        value={bid.chiefName}
                                    />
                                    <BidRow
                                        name="Курс"
                                        value={bid.courseName}
                                    />
                                    <WithAuth
                                        authChildren={
                                            <StatusBidRow
                                                isEditing={isEditing}
                                                status={status}
                                                setStatus={(value: string) =>
                                                    setStatus(
                                                        value as BidStatus,
                                                    )
                                                }
                                                option={option}
                                            />
                                        }
                                        unAuthChildren={
                                            <BidRow
                                                name="Статус"
                                                value={bid.status}
                                            />
                                        }
                                        allowedRoles={[Role.ADMIN]}
                                    />

                                    <BidRow name="Заслуги" value={bid.merits} />
                                    <BidRow
                                        name="Мотивационное письмо"
                                        value={bid.motivationLetter}
                                    />
                                </div>
                                <Controls
                                    openChoice={() => setIsChoosing(true)}
                                    applicationId={bid.applicationID}
                                    closeError={() => setError(null)}
                                    displayError={(message) =>
                                        setError(message)
                                    }
                                    isEditing={isEditing}
                                    openEditing={() => setIsEditing(true)}
                                    handleSave={() => mutate()}
                                />
                            </>
                        )}
                        {isChoosing && (
                            <GroupChoice
                                applicationId={bid.applicationID}
                                closeChoice={() => setIsChoosing(false)}
                                userId={bid.userId}
                            />
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default FullBid;

function GroupChoice({
    applicationId,
    closeChoice,
    userId,
}: {
    applicationId: number;
    closeChoice: () => void;
    userId: number;
}) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [isConfirmError, setIsConfirmError] = useState(false);
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryFn: () => GroupsService.getAll(),
        queryKey: ["groups"],
        select: (data) => data.data,
    });

    const { mutateAsync: updateBid, isLoading: isUpdatingLoading } =
        useMutation(
            () => {
                return ApplicationsService.updateStatus(
                    applicationId,
                    BidStatus.REGISTERED,
                );
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(["bids", applicationId]);
                    navigate(-1);
                },
            },
        );

    const { mutateAsync: createStudent } = useMutation(
        (groupId: number) => UserService.grandStudent({ groupId, userId }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
            },
        },
    );

    const handleConfirmBid = async (groupId: number) => {
        try {
            setIsConfirmError(false);
            setIsConfirmLoading(true);
            await Promise.all([createStudent(groupId), updateBid()]);
        } catch (error) {
            console.log(error);
            setIsConfirmError(true);
        } finally {
            setIsConfirmLoading(false);
        }
    };

    return (
        <div className={styles.choice}>
            <header>
                <h5>Выберите группу:</h5>
                <Button
                    variant="light-blue"
                    onClick={closeChoice}
                    disabled={isConfirmLoading}
                >
                    Вернуться назад
                </Button>
            </header>
            {(isError || isConfirmError) && (
                <Alert variant="error">
                    Что-то пошло не так, попробуйте еще раз позже
                </Alert>
            )}
            {isSuccess && data.length < 1 && (
                <Alert variant="info">Нет существующих групп</Alert>
            )}
            {isLoading && <Loader isCenter={true} />}
            {isSuccess && data.length > 0 && (
                <ul>
                    {data.map((group) => (
                        <li
                            key={group.groupId}
                            onClick={() => handleConfirmBid(group.groupId)}
                            className={cn(isUpdatingLoading && styles.disabled)}
                        >
                            <span>{group.groupName}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function BidRow({ name, value }: { name: string; value: string }) {
    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}:</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}

function StatusBidRow({
    status,
    isEditing,
    option,
    setStatus,
}: {
    status: BidStatus;
    isEditing: boolean;
    setStatus: (value: string) => void;
    option: BidOption;
}) {
    if (!isEditing) {
        return <BidRow name="Статус" value={status} />;
    }

    return (
        <div className={styles.editRow}>
            <div>Статус:</div>
            <Select
                defaultValue={option.value}
                onChange={(event) => setStatus(event.target.value)}
            >
                {options.map(({ label, value }) => (
                    <option key={value}>{label}</option>
                ))}
            </Select>
        </div>
    );
}

function Controls({
    applicationId,
    closeError,
    displayError,
    openEditing,
    handleSave,
    isEditing,
    openChoice,
}: {
    applicationId: number;
    displayError: (message: string) => void;
    closeError: () => void;
    openEditing: () => void;
    isEditing: boolean;
    handleSave: () => void;
    openChoice: () => void;
}) {
    const { role } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        mutate: handleUpdateButtonClick,
        isError: isUpdateError,
        isLoading: isUpdateLoading,
    } = useMutation(
        (status: BidStatus) => {
            closeError();
            return ApplicationsService.updateStatus(applicationId, status);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["bids", applicationId]);
                navigate(-1);
            },
        },
    );

    const {
        mutate: handleDelete,
        isError: isDeleteError,
        isLoading: isDeleteLoading,
    } = useMutation(
        () => {
            closeError();
            return ApplicationsService.delete(applicationId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["bids"]);
                navigate(-1);
            },
        },
    );

    useEffect(() => {
        if (isDeleteError) {
            displayError("Не удалось удалить заявку, попробуйте еще раз");
        } else if (isUpdateError) {
            displayError("Не удалить изменить заявку, попробуйте еще раз");
        }
    }, [isDeleteError, isUpdateError, displayError]);

    const isLoading = isDeleteLoading || isUpdateLoading;

    let authNodes: ReactNode[] = [
        <Button
            variant="light-blue"
            disabled={isLoading}
            onClick={() =>
                handleUpdateButtonClick(BidStatus.UNDER_CONSIDERATION)
            }
        >
            Согласовать
        </Button>,
        <Button variant="green" disabled={isLoading} onClick={openChoice}>
            Принять
        </Button>,
        <Button
            variant="dark-blue"
            disabled={isLoading}
            onClick={() => handleUpdateButtonClick(BidStatus.REJECTED)}
        >
            Отклонить
        </Button>,
        <Button
            variant={isEditing ? "green" : "light-blue"}
            disabled={isLoading}
            onClick={isEditing ? handleSave : openEditing}
        >
            {isEditing ? "Сохранить" : "Редактировать"}
        </Button>,
        <Button
            variant="red"
            disabled={isLoading}
            onClick={() => handleDelete()}
        >
            Удалить
        </Button>,
    ];

    if (role === Role.SELLECTION_COMMITE) {
        authNodes.splice(0, 1);
        authNodes.splice(2, 2);
    } else if (role === Role.MANAGER) {
        authNodes.splice(1, 4);
    } else if (role === Role.ADMIN) {
        authNodes.splice(0, 3);
    }

    const authComponent: ReactNode = (
        <footer className={styles.footer}>
            {authNodes.map((node, index) => (
                <Fragment key={index}>{node}</Fragment>
            ))}
        </footer>
    );

    return (
        <WithAuth
            authChildren={authComponent}
            unAuthChildren={null}
            allowedRoles={[Role.ADMIN, Role.SELLECTION_COMMITE, Role.MANAGER]}
        />
    );
}
