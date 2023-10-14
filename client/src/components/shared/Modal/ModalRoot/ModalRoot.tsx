import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./modal.scss";

interface Props {
    onClose: () => void;
    isActive: boolean;
    className?: string;
}

const ModalRoot: FC<PropsWithChildren<Props>> = ({
    children,
    className,
    isActive,
}) => {
    if (!isActive) return null;

    return <div className={cn("modal-root", className)}>{children}</div>;
};

export default ModalRoot;
