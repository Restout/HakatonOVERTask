import { FC, useState } from "react";

import { Container } from "components/shared/Container";

import { MaterialBlock } from "../MaterialBlock";
import styles from "./materials.module.scss";

const Materials: FC = () => {
    const [opened, setOpened] = useState([true, false, true]);

    const handleToggleOpened = (index: number) => {
        setOpened((prev) => {
            console.log(index);
            console.log(prev);
            const newArray = [...prev];
            newArray[index] = !prev[index];
            console.log(newArray);
            return newArray;
        });
    };

    // console.log(opened);

    return (
        <section className={styles.section}>
            <Container>
                <ul className={styles.blocks}>
                    <li>
                        <MaterialBlock
                            isOpened={opened[0]}
                            toggle={() => handleToggleOpened(0)}
                        />
                    </li>
                    <li>
                        <MaterialBlock
                            isOpened={opened[1]}
                            toggle={() => handleToggleOpened(1)}
                        />
                    </li>
                    <li>
                        <MaterialBlock
                            isOpened={opened[2]}
                            toggle={() => handleToggleOpened(2)}
                        />
                    </li>
                </ul>
            </Container>
        </section>
    );
};

export default Materials;
