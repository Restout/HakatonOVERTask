import { FC, useEffect, useImperativeHandle, useState } from "react";

import {
    Control,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";

import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import styles from "./coursesForm.module.scss";

export interface CourseFormState {
    courseName: string;
    about: string;
    programm: string;
    requirements: string;
    result: string;
}

interface FieldProps {
    register: UseFormRegister<CourseFormState>;
    error?: FieldErrorType;
    control?: Control<CourseFormState>;
    isDisabled: boolean;
}

interface Props {
    onSubmit: (data: CourseFormState) => Promise<void>;
    isDisabled: boolean;
    isError: boolean;
}

const CoursesForm: FC<Props> = ({ onSubmit, isDisabled, isError }) => {
    const [error, setError] = useState<string | null>(null);
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        formState: { errors },
    } = useForm<CourseFormState>();

    const handleSubmit: SubmitHandler<CourseFormState> = (data) => {
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
            encType="multipart/form-data"
        >
            {error && (
                <Alert className={styles.alert} variant="error">
                    {error}
                </Alert>
            )}
            <CourseName
                register={register}
                error={errors.courseName}
                isDisabled={isDisabled}
            />
            <About
                register={register}
                error={errors.about}
                isDisabled={isDisabled}
            />
            <Programm
                register={register}
                error={errors.programm}
                isDisabled={isDisabled}
            />
            <Requirements
                register={register}
                error={errors.requirements}
                isDisabled={isDisabled}
            />
            <Results
                register={register}
                error={errors.result}
                isDisabled={isDisabled}
            />
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

export default CoursesForm;

function CourseName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 150;

    const courseNameRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("courseName", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => courseNameRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="courseName">
                Наименование курса
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                {...rest}
                placeholder="Наименование"
                id="courseName"
                type="text"
                ref={courseNameRef}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function About({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 300;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "about"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="about">
                О курсе
            </Label>
            <Textarea
                className={styles.input}
                disabled={isDisabled}
                placeholder="Предметная область"
                {...register("about", fieldOptions)}
                id="about"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Programm({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 300;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "programm"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="programm">
                Программа обучения
            </Label>
            <Textarea
                className={styles.input}
                disabled={isDisabled}
                placeholder="Что будет изучаться"
                {...register("programm", fieldOptions)}
                id="programm"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Requirements({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 300;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "requirements"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="requirements">
                Требования
            </Label>
            <Textarea
                className={styles.input}
                disabled={isDisabled}
                placeholder="Что требуется для обучения"
                {...register("requirements", fieldOptions)}
                id="requirements"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Results({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 300;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "result"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="results">
                Результат
            </Label>
            <Textarea
                className={styles.input}
                disabled={isDisabled}
                placeholder="Полученные навыки"
                {...register("result", fieldOptions)}
                id="results"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
