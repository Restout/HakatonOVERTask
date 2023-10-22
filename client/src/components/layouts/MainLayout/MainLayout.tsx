import { FC } from "react";

import { Outlet } from "react-router-dom";

import { Footer } from "components/shared/Footer";
import { Header } from "components/shared/Header";

import styles from "./mainLayout.module.scss";

interface Props {}

const MainLayout: FC<Props> = () => {
    return (
        <div className={styles.page}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
