import { FC, useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Alert } from "components/ui/Alert";
import Button from "components/ui/Button/Button";
import { FieldGroup } from "components/ui/FieldGroup";
import Input from "components/ui/Input/Input/Input";
import { Label } from "components/ui/Label";
import { Modal } from "components/ui/Modal/Modal";
import { Title } from "components/ui/typography/Title";

import { useAuth } from "hooks/auth/useAuth";
import useTypedSelector from "hooks/shared/useTypedSelector";

import GroupsService from "services/GroupsService";

import { GroupCreateRequest, IGroup } from "types/group.interface";

import styles from "./styles.module.scss";

const GroupsListPage: FC = () => {
    const { isAuth, role } = useAuth();
    const { user } = useTypedSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const {
        data: groups,
        refetch,
        isFetching,
    } = useQuery(["groups", user?.id], () =>
        GroupsService.getAll(user?.id).then((res) => res.data),
    );

    const { mutate: createGroup } = useMutation(
        (data: GroupCreateRequest) => GroupsService.createGroup(data),
        {
            onSuccess: () => {
                refetch();
                setIsModalOpen(false);
                setGroupName("");
                setError(null);
            },
            onError: () => {
                setError("Не удалось создать группу");
            },
        },
    );

    const handleCreateGroup = () => {
        if (!groupName.trim()) {
            setError("Введите название группы");
            return;
        }

        if (!user?.id) {
            setError("Необходимо авторизоваться");
            return;
        }

        createGroup({
            groupName: groupName.trim(),
            creatorId: user.id,
        });
    };

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Группы</title>
            </Helmet>

            <div className={styles.header}>
                <Title className={styles.title}>Учебные группы</Title>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="dark-blue"
                >
                    Создать группу
                </Button>
            </div>

            {groups && groups.length > 0 ? (
                <ul className={styles.groupsList}>
                    {groups.map(({ groupId, groupName }) => (
                        <li key={groupId}>
                            <Link to={`${groupId}`}>{groupName}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                !isFetching && (
                    <Alert variant="info" className={styles.noGroups}>
                        У вас пока нет групп. Создайте новую группу, чтобы
                        начать работу.
                    </Alert>
                )
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setError(null);
                    setGroupName("");
                }}
                title="Создание группы"
            >
                <div className={styles.modalContent}>
                    {error && (
                        <Alert variant="error" className={styles.error}>
                            {error}
                        </Alert>
                    )}

                    <FieldGroup>
                        <Label htmlFor="groupName" isRequired>
                            Название группы
                        </Label>
                        <Input
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Введите название группы"
                            className={styles.input}
                        />
                    </FieldGroup>

                    <div className={styles.modalActions}>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false);
                                setError(null);
                                setGroupName("");
                            }}
                            variant="light-blue"
                        >
                            Отмена
                        </Button>
                        <Button onClick={handleCreateGroup} variant="dark-blue">
                            Создать
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { GroupsListPage };
