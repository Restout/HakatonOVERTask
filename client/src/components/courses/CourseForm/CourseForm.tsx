import { FC, useImperativeHandle } from "react";

import cn from "clsx";
import {
    Control,
    FieldError as FieldErrorType,
    RegisterOptions,
    SubmitHandler,
    UseFormRegister,
    useForm,
} from "react-hook-form";

import { Button } from "components/ui/Button";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { FieldRow } from "components/ui/FieldRow";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Textarea } from "components/ui/Textarea";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import styles from "./courseForm.module.scss";

export interface CourseFormState {
    chiefName: string;
    chiefLastName: string;
    chiefFatherName: string;
    merits: string;
    motivationLetter: string;
    experience: string;
    currentPosition: string;
    departmentName: string;
}

interface FieldProps {
    register: UseFormRegister<CourseFormState>;
    error?: FieldErrorType;
    control?: Control<CourseFormState>;
    isDisabled?: boolean;
}

interface Props {
    onSubmit: (data: CourseFormState) => void;
    closeForm: () => void;
    isDisabled: boolean;
    className?: string;
}

const CourseForm: FC<Props> = ({
    onSubmit,
    className,
    closeForm,
    isDisabled,
}) => {
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        formState: { errors },
    } = useForm<CourseFormState>();

    const handleSubmit: SubmitHandler<CourseFormState> = (data) => {
        onSubmit(data);
    };

    return (
        <form
            className={cn(styles.form, className)}
            onSubmit={submitHandlerWrapper(handleSubmit)}
        >
            <FieldRow className={styles.row}>
                <CurrentPosition
                    register={register}
                    error={errors.currentPosition}
                    isDisabled={isDisabled}
                />
                <DepartmentName
                    register={register}
                    error={errors.departmentName}
                    isDisabled={isDisabled}
                />
            </FieldRow>
            <FieldRow className={styles.row}>
                <ChiefLastName
                    register={register}
                    error={errors.chiefLastName}
                    isDisabled={isDisabled}
                />
                <ChiefName
                    register={register}
                    error={errors.chiefName}
                    isDisabled={isDisabled}
                />
            </FieldRow>
            <FieldRow className={styles.row}>
                <ChiefFatherName
                    register={register}
                    error={errors.chiefFatherName}
                    isDisabled={isDisabled}
                />
                <Experience
                    register={register}
                    error={errors.experience}
                    isDisabled={isDisabled}
                />
            </FieldRow>
            <Merits
                register={register}
                error={errors.merits}
                isDisabled={isDisabled}
            />
            <MotivationLetter
                register={register}
                error={errors.motivationLetter}
                isDisabled={isDisabled}
            />
            <div className={styles.controls}>
                <Button
                    variant="green"
                    className={styles.button}
                    disabled={isDisabled}
                    type="submit"
                >
                    {isDisabled ? "Подождите" : "Отправить"}
                </Button>
                <Button
                    variant="red"
                    className={styles.button}
                    disabled={isDisabled}
                    onClick={closeForm}
                    type="button"
                >
                    Отменить
                </Button>
            </div>
        </form>
    );
};

export default CourseForm;

function CurrentPosition({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 40;

    const currentPositionRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("currentPosition", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => currentPositionRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="currentPosition">
                Текущая должность
            </Label>
            <Input
                className={styles.input}
                {...rest}
                placeholder="Должность"
                id="currentPosition"
                type="text"
                ref={currentPositionRef}
                disabled={isDisabled}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function DepartmentName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 40;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "departmentName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="departmentName">
                Наименование подразделения
            </Label>
            <Input
                className={styles.input}
                placeholder="Подразделение"
                disabled={isDisabled}
                {...register("departmentName", fieldOptions)}
                id="departmentName"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Experience({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 3;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "experience"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="experience">
                Ваш стаж работы
            </Label>
            <Input
                className={styles.input}
                placeholder="Стаж"
                disabled={isDisabled}
                {...register("experience", fieldOptions)}
                id="experience"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function ChiefName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 40;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "chiefName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="chiefName">
                Имя руководителя
            </Label>
            <Input
                className={styles.input}
                placeholder="Имя"
                disabled={isDisabled}
                {...register("chiefName", fieldOptions)}
                id="chiefName"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
function ChiefLastName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 40;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "chiefLastName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="chiefLastName">
                Фамилия руководителя
            </Label>
            <Input
                className={styles.input}
                placeholder="Фамилия"
                disabled={isDisabled}
                {...register("chiefLastName", fieldOptions)}
                id="chiefLastName"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
function ChiefFatherName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 40;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "chiefFatherName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="chiefFatherName">
                Отчество руководителя
            </Label>
            <Input
                className={styles.input}
                placeholder="Отчество"
                disabled={isDisabled}
                {...register("chiefFatherName", fieldOptions)}
                id="chiefFatherName"
                type="text"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Merits({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 200;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "merits"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="merits">
                Личные достижения за последние 12 месяцев
            </Label>
            <Textarea
                className={styles.input}
                placeholder="Достижения"
                disabled={isDisabled}
                {...register("merits", fieldOptions)}
                id="merits"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function MotivationLetter({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 200;

    const { required, maxLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<CourseFormState, "motivationLetter"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="motivationLetter">
                Мотивационное письмо
            </Label>
            <Textarea
                className={styles.input}
                placeholder="Что вас заинтересовало"
                disabled={isDisabled}
                {...register("motivationLetter", fieldOptions)}
                id="motivationLetter"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
