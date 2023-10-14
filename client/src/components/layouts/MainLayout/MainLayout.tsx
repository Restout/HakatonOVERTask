import { FC } from "react";

import cn from "clsx";
import { Outlet } from "react-router-dom";

import styles from "./mainLayout.module.scss";

interface Props {}

const MainLayout: FC<Props> = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
};

export default MainLayout;

function Navigation() {
    return <></>;
}
