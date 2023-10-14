import { FC } from "react";

import cn from "clsx";

import "./logo.scss";

interface Props {
    className?: string;
}

const Logo: FC<Props> = ({ className }) => {
    return (
        <div className={cn("logo", className)}>
            <div className="logo__icon">
                <span className="logo__icon-item" />
                <span className="logo__icon-item" />
                <span className="logo__icon-item" />
            </div>
            <h2 className="logo__title">kanban</h2>
        </div>
    );
};

export default Logo;
