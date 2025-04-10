import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export const Modal: FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    className = '' 
}) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        
        // Блокируем прокрутку body при открытом модальном окне
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div 
                className={`${styles.modal} ${className}`}
                onClick={(e) => e.stopPropagation()} 
            >
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    <button 
                        className={styles.closeButton} 
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}; 