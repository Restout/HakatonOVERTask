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

import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { DateInput } from "components/ui/DateInput";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { FieldRow } from "components/ui/FieldRow";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import styles from "./materialsForm.module.scss";

export interface MaterialsFormState {
    title: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
}

interface FieldProps {
    register: UseFormRegister<MaterialsFormState>;
    error?: FieldErrorType;
    control?: Control<MaterialsFormState>;
    setValue?: UseFormSetValue<MaterialsFormState>;
    isDisabled: boolean;
}

interface Props {
    onSubmit: (data: MaterialsFormState) => Promise<void>;
    isDisabled: boolean;
    isError: boolean;
    close: () => void;
}

const MaterialsForm: FC<Props> = ({ isDisabled, isError, onSubmit, close }) => {
    const [error, setError] = useState<string | null>(null);
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        control,
        formState: { errors },
    } = useForm<MaterialsFormState>();

    const handleSubmit: SubmitHandler<MaterialsFormState> = (data) => {
        onSubmit(data);
    };

    useEffect(() => {
        if (isError) {
            setError("Что-то пошло не так, попробуйте еще раз.");
        } else {
            setError(null);
        }
    }, [isError]);

    return (
        <form
            className={styles.form}
            onSubmit={submitHandlerWrapper(handleSubmit)}
        >
            {error && (
                <Alert className={styles.alert} variant="error">
                    {error}
                </Alert>
            )}
            <FieldRow className={styles.row}>
                <Title
                    register={register}
                    error={errors.title}
                    isDisabled={isDisabled}
                />
                <DateStart
                    register={register}
                    control={control}
                    error={errors.dateStart}
                    isDisabled={isDisabled}
                />
                <DateEnd
                    register={register}
                    control={control}
                    error={errors.dateEnd}
                    isDisabled={isDisabled}
                />
            </FieldRow>
            <Description
                register={register}
                error={errors.description}
                isDisabled={isDisabled}
            />
            <div className={styles.controls}>
                <Button variant="green" type="submit" disabled={isDisabled}>
                    Добавить
                </Button>
                <Button
                    variant="light-blue"
                    type="button"
                    disabled={isDisabled}
                    onClick={close}
                >
                    Отменить
                </Button>
            </div>
        </form>
    );
};

export default MaterialsForm;

function Title({ register, error, isDisabled }: FieldProps) {
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
                Название блока
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                {...rest}
                placeholder="Название"
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

    const fieldOptions: RegisterOptions<MaterialsFormState, "description"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="description">
                Описание блока
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

function DateStart({ control }: FieldProps) {
    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="dateStart">
                Дата начала
            </Label>
            <Controller
                name="dateStart"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <DateInput
                            {...field}
                            selected={value}
                            onChange={(date) => onChange(date)}
                            id="dateStart"
                            placeholderText="Дата начала"
                            className={styles.date}
                        />
                    );
                }}
            />
        </FieldGroup>
    );
}

function DateEnd({ control }: FieldProps) {
    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="dateEnd">
                Дата окончания
            </Label>
            <Controller
                name="dateEnd"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <DateInput
                            {...field}
                            selected={value}
                            onChange={(date) => onChange(date)}
                            id="dateEnd"
                            placeholderText="Дата окончания"
                            className={styles.date}
                        />
                    );
                }}
            />
        </FieldGroup>
    );
}
