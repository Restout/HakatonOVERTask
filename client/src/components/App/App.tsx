import { FC } from "react";

import { useRefresh } from "hooks/auth/useRefresh";

import { Router } from "../Router";
import { Loader } from "../ui/Loader";
import styles from "./app.module.scss";

const App: FC = () => {
    const { isInitialLoading } = useRefresh();

    if (isInitialLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <Loader />
            </div>
        );
    }

    return <Router />;
};

export default App;
