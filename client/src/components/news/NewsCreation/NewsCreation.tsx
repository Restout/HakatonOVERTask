import { FC } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";

import { Title } from "components/ui/typography/Title";

import NewsService from "services/NewsService";

import { NewsForm } from "../NewsForm";
import { NewsFormState } from "../NewsForm/NewsForm";
import styles from "./newsCreation.module.scss";

interface Props {
    className?: string;
    close: () => void;
}

const NewsCreation: FC<Props> = ({ className, close }) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: FormData) => {
            return NewsService.post(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["news"]);
            close()
        },
    });

    const handleSubmit = async (data: NewsFormState) => {
        const formData = new FormData();

        formData.append("content", data.description);
        formData.append("title", data.title);

        if (data.image) {
            formData.append("image", data.image);
            formData.append("fileName", data.image.name);
        }

        mutate(formData);
    };

    return (
        <div className={cn(styles.body, className)}>
            <Title className={styles.title}>Новая новость</Title>
            <NewsForm onSubmit={handleSubmit} />
        </div>
    );
};

export default NewsCreation;
