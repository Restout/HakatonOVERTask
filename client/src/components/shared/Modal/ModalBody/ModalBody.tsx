import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./modalBody.scss";

interface Props {
    className?: string;
}

const ModalBody: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={cn("modal-body", className)}>{children}</div>;
};

export default ModalBody;
