import { FC, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "api";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Alert } from "components/ui/Alert";
import Button from "components/ui/Button/Button";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Modal } from "components/ui/Modal/Modal";

import { useAuth } from "hooks/auth/useAuth";
import useTypedSelector from "hooks/shared/useTypedSelector";

import RoomService from "services/RoomService";

import { IRoom, RoomCreateRequest } from "types/room.interface";

import styles from "./styles.module.scss";

const RoomsPage: FC = () => {
    const { isAuth, role } = useAuth();
    const { user } = useTypedSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { data: rooms, refetch } = useQuery(["rooms"], () =>
        RoomService.getAll().then((res) => res.data),
    );

    const { mutate: createRoom } = useMutation(
        (data: RoomCreateRequest) => RoomService.create(data),
        {
            onSuccess: () => {
                refetch();
                setIsModalOpen(false);
                setRoomName("");
                setError(null);
            },
            onError: () => {
                setError("Не удалось создать комнату");
            },
        },
    );

    const handleCreateRoom = () => {
        if (!roomName.trim()) {
            setError("Введите название комнаты");
            return;
        }

        if (!user?.id) {
            setError("Необходимо авторизоваться");
            return;
        }

        createRoom({
            name: roomName.trim(),
            createdBy: user.id,
        });
    };

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Видеокомнаты</title>
            </Helmet>

            <div className={styles.header}>
                <h1>Видеокомнаты</h1>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="dark-blue"
                >
                    Создать комнату
                </Button>
            </div>

            {error && (
                <Alert variant="error" className={styles.error}>
                    {error}
                </Alert>
            )}

            {rooms && rooms.length > 0 ? (
                <div className={styles.roomsList}>
                    {rooms.map((room: IRoom) => (
                        <div key={room.id} className={styles.roomCard}>
                            <div className={styles.roomInfo}>
                                <h3>{room.name}</h3>
                                <div className={styles.participants}>
                                    Участников: {room.participants.length}
                                </div>
                                <div className={styles.date}>
                                    Создана:{" "}
                                    {new Date(
                                        room.createdAt,
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                            <div className={styles.roomActions}>
                                <Button
                                    as={Link}
                                    to={`/rooms/${room.id}`}
                                    variant="dark-blue"
                                    className={styles.joinBtn}
                                >
                                    Присоединиться
                                </Button>
                                <CopyButton
                                    content={`${API_URL}/rooms/${room.id}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Alert variant="info" className={styles.noRooms}>
                    Видеокомнат пока нет. Создайте новую комнату, чтобы начать
                    видеосвязь.
                </Alert>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setError(null);
                    setRoomName("");
                }}
                title="Создание видеокомнаты"
            >
                <div className={styles.modalContent}>
                    {error && (
                        <Alert variant="error" className={styles.error}>
                            {error}
                        </Alert>
                    )}

                    <FieldGroup>
                        <Label htmlFor="roomName" isRequired>
                            Название комнаты
                        </Label>
                        <Input
                            id="roomName"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="Введите название комнаты"
                            className={styles.input}
                        />
                    </FieldGroup>

                    <div className={styles.modalActions}>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false);
                                setError(null);
                                setRoomName("");
                            }}
                            variant="light-blue"
                        >
                            Отмена
                        </Button>
                        <Button onClick={handleCreateRoom} variant="dark-blue">
                            Создать
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { RoomsPage };

function CopyButton({ content }: { content: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!navigator.clipboard) {
            const textarea = document.createElement("textarea");
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
                setIsCopied(true);
            } catch (err) {
                console.error("Fallback copy failed: ", err);
            }
            document.body.removeChild(textarea);
            return;
        }

        navigator.clipboard
            .writeText(content)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 750);
            })
            .catch((err) => console.error("Could not copy text: ", err));
    };

    return (
        <Button
            variant="light-blue"
            className={styles.joinBtn}
            onClick={handleCopy}
            disabled={isCopied}
        >
            {isCopied ? "✓ Скопировано" : "Скопировать адрес"}
        </Button>
    );
}
