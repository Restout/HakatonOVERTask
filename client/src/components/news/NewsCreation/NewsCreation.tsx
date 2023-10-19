import { FC } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import NewsService from "services/NewsService";

import { NewsForm } from "../NewsForm";
import { NewsFormState } from "../NewsForm/NewsForm";
import styles from "./newsCreation.module.scss";

interface Props {
    className?: string;
}

const NewsCreation: FC<Props> = ({ className }) => {
    const queryClient = useQueryClient();

    const { mutate, data } = useMutation({
        mutationFn: (data: FormData) => {
            return NewsService.post(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["news"]);
        },
    });

    console.log(data?.data)

    const handleSubmit = async (data: NewsFormState) => {
        console.log(data);

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
