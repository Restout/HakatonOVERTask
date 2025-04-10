import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

import Button from 'components/ui/Button/Button';
import { Alert } from 'components/ui/Alert';
import Input from 'components/ui/Input/Input/Input';
import { Label } from 'components/ui/Label';
import { FieldGroup } from 'components/ui/FieldGroup';
import { Modal } from 'components/ui/Modal/Modal';

import GroupsService from 'services/GroupsService';
import { UserGroupRequest, ServerGroupResponse, UserDetails } from 'types/group.interface';

import { useAuth } from 'hooks/auth/useAuth';
import useTypedSelector from 'hooks/shared/useTypedSelector';

import styles from './styles.module.scss';

// Функция для форматирования даты рождения
const formatBirthday = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    } catch (e) {
        return 'Недоступно';
    }
};

const GroupDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isAuth, role } = useAuth();
    const { user } = useTypedSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { data: group, refetch } = useQuery(['group', id], () => 
        GroupsService.getGroup(Number(id)).then(res => res.data)
    );

    const { mutate: addUserToGroup } = useMutation(
        (data: UserGroupRequest) => GroupsService.addUserToGroup(data),
        {
            onSuccess: () => {
                refetch();
                setIsModalOpen(false);
                setEmail('');
                setError(null);
            },
            onError: () => {
                setError('Не удалось добавить пользователя');
            }
        }
    );

    const { mutate: removeUserFromGroup } = useMutation(
        (data: UserGroupRequest) => GroupsService.removeUserFromGroup(data),
        {
            onSuccess: () => {
                refetch();
            },
            onError: () => {
                setError('Не удалось удалить пользователя');
            }
        }
    );

    const handleAddUser = () => {
        if (!email.trim()) {
            setError('Введите email пользователя');
            return;
        }

        if (!id) {
            setError('ID группы не найден');
            return;
        }

        addUserToGroup({
            groupId: Number(id),
            userEmail: email.trim()
        });
    };

    const handleRemoveUser = (userEmail: string) => {
        if (!id) {
            return;
        }

        removeUserFromGroup({
            groupId: Number(id),
            userEmail: userEmail
        });
    };

    // Проверяем, является ли текущий пользователь создателем группы
    const isCreator = user?.id === group?.creator?.id;

    return (
        <div className={styles.container}>
            <Helmet>
                <title>{group?.groupName || 'Загрузка...'}</title>
            </Helmet>
            
            <div className={styles.header}>
                <h1>{group?.groupName || 'Загрузка...'}</h1>
                {isCreator && (
                    <Button onClick={() => setIsModalOpen(true)} variant="dark-blue">
                        Добавить участника
                    </Button>
                )}
            </div>

            <div className={styles.membersSection}>
                <h2>Участники группы</h2>
                
                {group?.students && group.students.length > 0 ? (
                    <div className={styles.membersList}>
                        {group.students.map((member: UserDetails) => (
                            <div key={member.id} className={styles.memberCard}>
                                <div className={styles.memberInfo}>
                                    <div className={styles.memberName}>
                                        <strong>{member.lastName} {member.firstName} {member.fatherName}</strong>
                                    </div>
                                    <div className={styles.memberDetail}>
                                        <span className={styles.label}>Email:</span> {member.email}
                                    </div>
                                    <div className={styles.memberDetail}>
                                        <span className={styles.label}>Телефон:</span> {member.phone}
                                    </div>
                                    <div className={styles.memberDetail}>
                                        <span className={styles.label}>Дата рождения:</span> {formatBirthday(member.birthday)}
                                    </div>
                                    <div className={styles.role}>{member.role}</div>
                                </div>
                                {(isCreator || user?.id === member.id) && (
                                    <Button 
                                        onClick={() => handleRemoveUser(member.email)} 
                                        variant="light-blue" 
                                        className={styles.removeBtn}
                                    >
                                        Удалить
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Alert variant="info" className={styles.noMembers}>
                        В этой группе пока нет участников.
                    </Alert>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setError(null);
                    setEmail('');
                }}
                title="Добавление участника"
            >
                <div className={styles.modalContent}>
                    {error && (
                        <Alert variant="error" className={styles.error}>
                            {error}
                        </Alert>
                    )}
                    
                    <FieldGroup>
                        <Label htmlFor="email" isRequired>
                            Email пользователя
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите email пользователя"
                        />
                    </FieldGroup>
                    
                    <div className={styles.modalActions}>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false);
                                setError(null);
                                setEmail('');
                            }}
                            variant="light-blue"
                        >
                            Отмена
                        </Button>
                        <Button onClick={handleAddUser} variant="dark-blue">
                            Добавить
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { GroupDetailsPage }; 