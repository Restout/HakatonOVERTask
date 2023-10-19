import { FC } from "react";

import { Materials } from "components/courses/Materials";

import styles from "./programPage.module.scss";

const ProgramPage: FC = () => {
    return (
        <>
            {/* <section>Информация о курсе</section> */}
            <Materials />
        </>
    );
};

export default ProgramPage;
