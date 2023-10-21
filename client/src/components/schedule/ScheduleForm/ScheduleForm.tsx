import {
    ChangeEvent,
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
import { Checkbox } from "components/ui/Checkbox";
import { CheckboxLabelGroup } from "components/ui/Checkbox/CheckboxLabelGroup";
import { DateInput } from "components/ui/DateInput";
import { FieldError } from "components/ui/FieldError";
import { FieldGroup } from "components/ui/FieldGroup";
import { FieldRow } from "components/ui/FieldRow";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import useFocus from "hooks/shared/useFocus";

import { formErrors } from "constants/formErrors";

import styles from "./scheduleForm.module.scss";

export interface ScheduleFormState {
    day: Date;
    lesson: string;
    startTime: string;
    endTime: string;
    audience: string;
    teacherId: string;
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
        setValue,
        formState: { errors },
    } = useForm<ScheduleFormState>({
        defaultValues: {
            audience: "Дистанционно",
        },
    });

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
                <Lesson
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.lesson}
                />
                <TeacherId
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.teacherId}
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
                <Audience
                    setValue={setValue}
                    register={register}
                    isDisabled={isDisabled}
                    error={errors.audience}
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

function Lesson({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 150;

    const lessonRef = useFocus<HTMLInputElement>();

    const { ref, ...rest } = register("lesson", {
        required: formErrors.required,
        maxLength: {
            value: LENGTH_LIMIT,
            message: formErrors.maxLengthLimit(LENGTH_LIMIT),
        },
    });

    useImperativeHandle(ref, () => lessonRef.current);

    return (
        <FieldGroup className={styles.group}>
            <Label isRequired={true} htmlFor="lesson">
                Предмет
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                {...rest}
                placeholder="Название предмета"
                id="lesson"
                type="text"
                ref={lessonRef}
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function TeacherId({ register, error, isDisabled }: FieldProps) {
    const LENGTH_LIMIT = 10;
    const MIN_LENGTH = 1;

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
            <Label isRequired={true} htmlFor="teacherId">
                Идентификатор учителя
            </Label>
            <Input
                className={styles.input}
                disabled={isDisabled}
                placeholder="Идентификатор"
                {...register("teacherId", fieldOptions)}
                id="teacherId"
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
                placeholder="10:00"
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
                placeholder="11:30"
                {...register("endTime", fieldOptions)}
                id="endTime"
                aria-invalid={error ? "true" : "false"}
            />
            {error && <FieldError>{error.message}</FieldError>}
        </FieldGroup>
    );
}

function Audience({ register, error, isDisabled, setValue }: FieldProps) {
    const LENGTH_LIMIT = 14;
    const MIN_LENGTH = 1;
    const [isChecked, setIsChecked] = useState(true);

    const { required, maxLengthLimit, minLengthLimit } = formErrors;

    const fieldOptions: RegisterOptions<ScheduleFormState, "audience"> = {
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

    const handleCheck = () => {
        setIsChecked((prev) => !prev);

        if (!isChecked) {
            setValue?.("audience", "Дистанционно");
        } else {
            setValue?.("audience", "");
        }
    };

    return (
        <div className={styles.audienceBlock}>
            <CheckboxLabelGroup className={styles.checkboxGroup}>
                <Checkbox checked={isChecked} onChange={handleCheck} />
                <span>Дистанционно</span>
            </CheckboxLabelGroup>
            {!isChecked && (
                <FieldGroup className={styles.group}>
                    <Label isRequired={true} htmlFor="audience">
                        Аудитория
                    </Label>
                    <Input
                        className={styles.input}
                        disabled={isDisabled}
                        placeholder="Номер"
                        {...register("audience", fieldOptions)}
                        id="audience"
                        aria-invalid={error ? "true" : "false"}
                    />
                    {error && <FieldError>{error.message}</FieldError>}
                </FieldGroup>
            )}
        </div>
    );
}
