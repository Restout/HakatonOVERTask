import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

import { Button } from 'components/ui/Button';
import { Alert } from 'components/ui/Alert';

import RoomService from 'services/RoomService';
import { RoomJoinRequest } from 'types/room.interface';

import { useAuth } from 'hooks/auth/useAuth';
import useTypedSelector from 'hooks/shared/useTypedSelector';

import styles from './styles.module.scss';

// Интеграция с WebRTC
const RoomPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuth, role } = useAuth();
    const { user } = useTypedSelector((state) => state.user);
    const [error, setError] = useState<string | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
    const [isMicEnabled, setIsMicEnabled] = useState(false);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [mediaRequested, setMediaRequested] = useState(false);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnections = useRef<Record<string, RTCPeerConnection>>({});

    // Получение данных о комнате
    const { data: room, refetch } = useQuery(['room', id], () => 
        RoomService.getById(id || '').then(res => res.data),
        {
            enabled: !!id,
            onError: () => {
                setError('Не удалось загрузить данные о комнате');
            }
        }
    );

    // Присоединение к комнате
    const { mutate: joinRoom } = useMutation(
        (data: RoomJoinRequest) => RoomService.join(data),
        {
            onSuccess: () => {
                refetch();
            },
            onError: () => {
                setError('Не удалось присоединиться к комнате');
            }
        }
    );

    // Выход из комнаты
    const { mutate: leaveRoom } = useMutation(
        (data: RoomJoinRequest) => RoomService.leave(data),
        {
            onSuccess: () => {
                navigate('/rooms');
            },
            onError: () => {
                setError('Не удалось выйти из комнаты');
            }
        }
    );

    // Функция для запроса доступа к медиа-устройствам
    const initMediaDevices = async () => {
        try {
            setMediaRequested(true);
            setError(null);
            
            // Запрашиваем доступ к медиа устройствам
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            
            setLocalStream(stream);
            
            // Установим поток для видео
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            
            // Начинаем с отключенных устройств
            // Выключаем аудио и видео треки по умолчанию
            stream.getAudioTracks().forEach(track => {
                track.enabled = false;
            });
            
            stream.getVideoTracks().forEach(track => {
                track.enabled = false;
            });
            
            return stream;
        } catch (err: any) {
            console.error('Ошибка доступа к медиа устройствам:', err);
            if (err.name === 'NotAllowedError') {
                setError('Доступ к камере или микрофону запрещен. Пожалуйста, разрешите доступ в настройках браузера.');
            } else if (err.name === 'NotFoundError') {
                setError('Камера или микрофон не найдены. Подключите устройства и попробуйте снова.');
            } else if (err.name === 'NotReadableError') {
                setError('Камера или микрофон уже используются другим приложением. Закройте другие приложения и попробуйте снова.');
            } else {
                setError('Не удалось получить доступ к камере или микрофону. Проверьте разрешения браузера.');
            }
            return null;
        }
    };

    // Инициализация комнаты
    useEffect(() => {
        if (!id || !user?.id) return;

        // Присоединяемся к комнате
        joinRoom({
            roomId: id,
            userId: user.id
        });

        // Очистка при размонтировании
        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            
            // Закрываем все peer connections
            Object.values(peerConnections.current).forEach(pc => pc.close());
            peerConnections.current = {};
            
            // Выходим из комнаты при закрытии
            if (user?.id) {
                leaveRoom({
                    roomId: id,
                    userId: user.id
                });
            }
        };
    }, [id, user?.id]);

    const handleLeaveRoom = () => {
        if (!id || !user?.id) return;
        
        leaveRoom({
            roomId: id,
            userId: user.id
        });
    };

    const toggleMicrophone = async () => {
        // Если не запрашивали медиа, запрашиваем
        if (!localStream && !mediaRequested) {
            const stream = await initMediaDevices();
            if (!stream) return;
            
            // Включаем только микрофон
            stream.getAudioTracks().forEach(track => {
                track.enabled = true;
            });
            setIsMicEnabled(true);
            return;
        }
        
        // Если поток уже есть
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                const isEnabled = !audioTracks[0].enabled;
                audioTracks[0].enabled = isEnabled;
                setIsMicEnabled(isEnabled);
            }
        }
    };

    const toggleCamera = async () => {
        // Если не запрашивали медиа, запрашиваем
        if (!localStream && !mediaRequested) {
            const stream = await initMediaDevices();
            if (!stream) return;
            
            // Включаем только камеру
            stream.getVideoTracks().forEach(track => {
                track.enabled = true;
            });
            setIsCameraEnabled(true);
            return;
        }
        
        // Если поток уже есть
        if (localStream) {
            const videoTracks = localStream.getVideoTracks();
            if (videoTracks.length > 0) {
                const isEnabled = !videoTracks[0].enabled;
                videoTracks[0].enabled = isEnabled;
                setIsCameraEnabled(isEnabled);
            }
        }
    };

    return (
        <div className={styles.container}>
            <Helmet>
                <title>{room?.name || 'Загрузка...'} | Видеокомната</title>
            </Helmet>
            
            <div className={styles.header}>
                <h1>{room?.name || 'Загрузка...'}</h1>
                <Button onClick={handleLeaveRoom} variant="red">
                    Выйти из комнаты
                </Button>
            </div>

            {error && (
                <Alert variant="error" className={styles.error}>
                    {error}
                </Alert>
            )}

            <div className={styles.videoContainer}>
                <div className={styles.localVideo}>
                    {!localStream || !isCameraEnabled ? (
                        <div className={styles.cameraOff}>
                            <p>Камера выключена</p>
                        </div>
                    ) : null}
                    <video 
                        ref={localVideoRef} 
                        autoPlay 
                        muted 
                        playsInline
                        className={styles.videoElement}
                    />
                    <div className={styles.videoLabel}>
                        Вы {!isMicEnabled ? "(микрофон выключен)" : ""}
                    </div>
                </div>
                
                <div className={styles.remoteVideos}>
                    {remoteStreams.length === 0 ? (
                        <div className={styles.noParticipants}>
                            Других участников пока нет
                        </div>
                    ) : (
                        remoteStreams.map((stream, index) => (
                            <div key={index} className={styles.remoteVideo}>
                                <video
                                    autoPlay
                                    playsInline
                                    className={styles.videoElement}
                                    // @ts-ignore - Приводим HTMLVideoElement к объекту с srcObject
                                    ref={el => { if (el) el.srcObject = stream; }}
                                />
                                <div className={styles.videoLabel}>Участник {index + 1}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className={styles.controls}>
                <Button 
                    onClick={toggleMicrophone}
                    className={`${styles.controlBtn} ${!isMicEnabled ? styles.controlBtnDisabled : ''}`}
                    variant="dark-blue"
                >
                    {isMicEnabled ? 'Выключить микрофон' : 'Включить микрофон'}
                </Button>
                
                <Button 
                    onClick={toggleCamera}
                    className={`${styles.controlBtn} ${!isCameraEnabled ? styles.controlBtnDisabled : ''}`}
                    variant="dark-blue"
                >
                    {isCameraEnabled ? 'Выключить камеру' : 'Включить камеру'}
                </Button>
            </div>
        </div>
    );
};

export { RoomPage };
