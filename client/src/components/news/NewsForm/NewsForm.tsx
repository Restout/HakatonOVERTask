import { FC, useEffect, useImperativeHandle, useState } from "react";

import {
    Control,
    Controller,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    UseFormSetValue,
    useForm,
} from "react-hook-form";

import { Button } from "components/ui/Button";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import closeIcon from "assets/img/icons/close.svg";

import styles from "./newsForm.module.scss";

export interface NewsFormState {
    description: string;
    title: string;
    image: File | null;
}

interface FieldProps {
    register: UseFormRegister<NewsFormState>;
    error?: FieldErrorType;
    control?: Control<NewsFormState>;
}

interface Props {
    onSubmit: (data: NewsFormState) => Promise<void>;
}

const NewsForm: FC<Props> = ({ onSubmit }) => {
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<NewsFormState>();

    const handleSubmit: SubmitHandler<NewsFormState> = async (data) => {
        onSubmit(data);
        reset();
    };

    return (
        <form
            className={styles.form}
            onSubmit={submitHandlerWrapper(handleSubmit)}
            encType="multipart/form-data"
        >
            <Image
                register={register}
                control={control}
                setValue={setValue}
                error={errors.image}
            />
            <Title register={register} error={errors.title} />
            <Description register={register} error={errors.description} />
            <Button
                variant="green"
                className={styles.submitButton}
                type="submit"
            >
                Создать
            </Button>
        </form>
    );
};

export default NewsForm;

function Image({
    control,
    setValue,
    error,
}: FieldProps & { setValue: UseFormSetValue<NewsFormState> }) {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setValue("image", null);
            return;
        }

        const file = event.target.files[0];
        setValue("image", file);
        setFile(file);
    };

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleClosePreview = () => {
        setValue("image", null);
        setFile(null);
    };

    return (
        <>
            {preview && (
                <div className={styles.imgWrapper}>
                    <button
                        className={styles.removeIconWrapper}
                        onClick={handleClosePreview}
                    >
                        <img src={closeIcon} alt="Close" />
                    </button>
                    <img
                        className={styles.imgPreview}
                        src={preview}
                        alt="Preview"
                    />
                </div>
            )}
            <FieldGroup className={styles.group}>
                <Controller
                    control={control}
                    name="image"
                    rules={{ required: "Обязательное поле" }}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <Input
                                className={styles.input}
                                {...field}
                                onChange={handleSelectFile}
                                type="file"
                                id="image"
                                accept="image/png, image/jpeg"
                            />
                        );
                    }}
                />
                {error && <FieldError>{error.message}</FieldError>}
            </FieldGroup>
        </>
    );
}

function Title({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 150;

    const titleRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("title", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => titleRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="title">
                Заголовок
            </Label>
            <Input
                className={styles.input}
                {...rest}
                placeholder="Заголовок"
                id="title"
                type="text"
                ref={titleRef}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Description({ register, error }: FieldProps) {
    const LENGTH_LIMIT = 300;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<NewsFormState, "description"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="description">
                Описание
            </Label>
            <Textarea
                className={styles.input}
                placeholder="Описание"
                {...register("description", fieldOptions)}
                id="description"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
