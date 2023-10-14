import { FC } from "react";

import cn from "clsx";

// import { CloseButton } from "components/ui/CloseButton";

import "./modalHeader.scss";

interface Props {
    title: string;
    onClose: () => void;
    className?: string;
}

const ModalHeader: FC<Props> = ({ title, className, onClose }) => {
    return (
        <header className={cn("modal-header", className)}>
            <h3 className="modal-header__title">{title}</h3>
            {/* <CloseButton onClick={onClose} /> */}
        </header>
    );
};

export default ModalHeader;
