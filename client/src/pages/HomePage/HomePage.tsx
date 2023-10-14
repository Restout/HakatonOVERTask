import { FC } from "react";

import { Feed } from "components/screens/home/Feed";
import { Header } from "components/shared/Header";

import { SCHEDULE_PATH } from "constants/routesPathnames";

import styles from "./homePage.module.scss";

const HomePage: FC = () => {
    return (
        <div>
            <Header renderNav={() => <Navigation />} />
            <main className={styles.main}>
                <Feed />
            </main>
        </div>
    );
};

export default HomePage;

function Navigation() {
    return (
        <nav className={styles.nav}>
            <Header.Link to={SCHEDULE_PATH}>Расписание</Header.Link>
        </nav>
    );
}
