import { FC, PropsWithChildren } from "react";

import cn from "clsx";

import "./container.scss";

interface Props {
    fullHeight?: boolean;
    className?: string;
}

const Container: FC<PropsWithChildren<Props>> = ({
    children,
    className,
    fullHeight,
}) => {
    return (
        <div
            className={cn(
                "container",
                fullHeight && "container--h-full",
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
