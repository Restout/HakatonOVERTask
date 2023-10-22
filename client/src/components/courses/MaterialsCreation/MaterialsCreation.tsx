import { FC } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import MaterialsService from "services/MaterialsService";

import { transformDate } from "utils/transformDate";

import { MaterialDTO } from "types/material.interface";

import { MaterialsForm } from "../MaterialsForm";
import { MaterialsFormState } from "../MaterialsForm/MaterialsForm";
import styles from "./materialsCreation.module.scss";

interface Props {
    close: () => void;
    lessonId: number;
}

const MaterialsCreation: FC<Props> = ({ close, lessonId }) => {
    const queryClient = useQueryClient();
    const userId = useTypedSelector((state) => state.user.user?.id) as number;

    const {
        mutate: addMaterial,
        isLoading,
        isError,
    } = useMutation(
        (data: MaterialDTO) => MaterialsService.create(lessonId, userId, data),
        {
            onSuccess: () => {
                console.log(lessonId, userId);
                queryClient.invalidateQueries(["materials"]);
                close();
            },
        },
    );

    const handleSubmit = async (data: MaterialsFormState) => {
        const title = data.title.trim();
        const description = data.description.trim();
        const dateStart = transformDate(data.dateStart);
        const dateEnd = transformDate(data.dateEnd);

        if (!title || !description || !dateStart || !dateEnd) {
            return;
        }

        const newBlock: MaterialDTO = {
            title,
            description,
            dateStart: `${dateStart}T00:00:00.000`,
            dateEnd: `${dateEnd}T00:00:00.000`,
        };

        addMaterial(newBlock);
    };

    return (
        <div className={styles.body}>
            <Title className={styles.title}>Новый курс</Title>
            <MaterialsForm
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                isError={isError}
                close={close}
            />
        </div>
    );
};

export default MaterialsCreation;
