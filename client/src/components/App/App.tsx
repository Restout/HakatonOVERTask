import { FC } from "react";

import { Helmet } from "react-helmet";

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

    return (
        <>
            <Meta />
            <Router />
        </>
    );
};

export default App;

function Meta() {
    return (
        <Helmet>
            <link rel="canonical" href="http://localhost:3000" />
        </Helmet>
    );
}
