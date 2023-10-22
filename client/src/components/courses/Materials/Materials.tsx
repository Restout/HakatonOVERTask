import { FC, useState } from "react";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import { IMaterial } from "types/material.interface";

import { MaterialBlock } from "../MaterialBlock";
import { MaterialsCreation } from "../MaterialsCreation";
import styles from "./materials.module.scss";

interface Props {
    lessonId: number;
    materials: IMaterial[];
}

const Materials: FC<Props> = ({ materials, lessonId }) => {
    const [opened, setOpened] = useState<boolean[]>(() =>
        new Array(materials.length).fill(true),
    );
    const [isAdding, setIsAdding] = useState(false);

    const handleToggleOpened = (index: number) => {
        setOpened((prev) => {
            const newArray = [...prev];
            newArray[index] = !prev[index];
            return newArray;
        });
    };

    return (
        <section className={styles.section}>
            <Container>
                {!isAdding && (
                    <header className={styles.creationHeader}>
                        <Button
                            variant="light-blue"
                            onClick={() => setIsAdding(true)}
                        >
                            Добавить блок
                        </Button>
                    </header>
                )}
                {isAdding && (
                    <MaterialsCreation lessonId={lessonId} close={() => setIsAdding(false)} />
                )}
                <ul className={styles.blocks}>
                    {materials.map((material, index) => (
                        <li key={material.materialId}>
                            <MaterialBlock
                                material={material}
                                isOpened={opened[index]}
                                toggle={() => handleToggleOpened(index)}
                            />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};

export default Materials;
