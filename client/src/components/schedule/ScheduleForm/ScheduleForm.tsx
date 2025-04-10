import {
    FC,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

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

import styles from "./scheduleForm.module.scss";

export interface ScheduleFormState {
    day: Date;
    lessonName: string;
    lessonDescription: string;
    startTime: string;
    endTime: string;
    location: string;
    organizerFirstName: string;
    organizerLastName: string;
}

interface FieldProps {
    register: UseFormRegister<ScheduleFormState>;
    error?: FieldErrorType;
    control?: Control<ScheduleFormState>;
    setValue?: UseFormSetValue<ScheduleFormState>;
    isDisabled: boolean;
}

interface Props {
    onSubmit: (data: ScheduleFormState) => Promise<void>;
    isDisabled: boolean;
    isError: boolean;
}

const ScheduleForm: FC<Props> = ({ onSubmit, isDisabled, isError }) => {
    const [error, setError] = useState<string | null>(null);
    const {
        handleSubmit: submitHandlerWrapper,
        register,
        control,
        formState: { errors },
    } = useForm<ScheduleFormState>();

    const handleSubmit: SubmitHandler<ScheduleFormState> = (data) => {
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
            <FieldRow className={styles.lessonRow}>
                <LessonName
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.lessonName}
                />
                <OrganizerLastName
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.organizerLastName}
                />
            </FieldRow>
            <FieldRow>
                <LessonDescription
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.lessonDescription}
                />
                <OrganizerFirstName
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.organizerFirstName}
                />
            </FieldRow>
            <FieldRow className={styles.scheduleRow}>
                <Day
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.day}
                    control={control}
                />
                <StartTime
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.startTime}
                />
                <EndTime
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.endTime}
                />
            </FieldRow>
            <FieldRow className={styles.audienceRow}>
                <Location
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.location}
                />
            </FieldRow>
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

export default ScheduleForm;

function LessonName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 150;

    const lessonRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("lessonName", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => lessonRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="lessonName">
                Название предмета
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                {...rest}
                placeholder="Название предмета"
                id="lessonName"
                type="text"
                ref={lessonRef}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function LessonDescription({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 500;

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="lessonDescription">
                Описание занятия
            </Label>
            <Textarea
                className={styles.textarea}
                disabled={isDisabled}
                {...register("lessonDescription", {
                    required: formErrors.required,
                    maxLength: {
                        value: LENGTH_LIMIT,
                        message: formErrors.maxLengthLimit(LENGTH_LIMIT),
                    },
                })}
                placeholder="Описание занятия"
                id="lessonDescription"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function OrganizerLastName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 50;
    const MIN_LENGTH = 2;

    const { required, maxLengthLimit, minLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<ScheduleFormState, "organizerLastName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
        minLength: {
            value: MIN_LENGTH,
            message: minLengthLimit(MIN_LENGTH),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="organizerLastName">
                Фамилия преподавателя
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                placeholder="Фамилия"
                {...register("organizerLastName", fieldOptions)}
                id="organizerLastName"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function OrganizerFirstName({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 50;
    const MIN_LENGTH = 2;

    const { required, maxLengthLimit, minLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<ScheduleFormState, "organizerFirstName"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
        minLength: {
            value: MIN_LENGTH,
            message: minLengthLimit(MIN_LENGTH),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="organizerFirstName">
                Имя преподавателя
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                placeholder="Имя"
                {...register("organizerFirstName", fieldOptions)}
                id="organizerFirstName"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Day({ control }: FieldProps) {
    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="day">
                Дата занятия
            </Label>
            <Controller
                name="day"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                    return (
                        <DateInput
                            {...field}
                            selected={value}
                            onChange={(date) => onChange(date)}
                            id="day"
                            placeholderText="Дата занятия"
                            className={styles.date}
                        />
                    );
                }}
            />
        </FieldGroup>
    );
}

function StartTime({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 5;
    const MIN_LENGTH = 4;

    const { required, maxLengthLimit, minLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<ScheduleFormState, "startTime"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
        minLength: {
            value: MIN_LENGTH,
            message: minLengthLimit(MIN_LENGTH),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="startTime">
                Время начала
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                placeholder="Время начала (HH:MM)"
                {...register("startTime", fieldOptions)}
                id="startTime"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function EndTime({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 5;
    const MIN_LENGTH = 4;

    const { required, maxLengthLimit, minLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<ScheduleFormState, "endTime"> = {
        required: required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: maxLengthLimit(LENGTH_LIMIT),
        },
        minLength: {
            value: MIN_LENGTH,
            message: minLengthLimit(MIN_LENGTH),
        },
    };

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="endTime">
                Время окончания
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                placeholder="Время окончания (HH:MM)"
                {...register("endTime", fieldOptions)}
                id="endTime"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Location({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 500;

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="location">
                Место проведения
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                placeholder="Место проведения"
                {...register("location", {
                    required: formErrors.required,
                    maxLength: {
                        value: LENGTH_LIMIT,
                        message: formErrors.maxLengthLimit(LENGTH_LIMIT),
                    },
                })}
                id="location"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}
