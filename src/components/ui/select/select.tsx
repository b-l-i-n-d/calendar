import { useId } from "react";
import styles from "./select.module.scss";

interface ISelectProps {
    title?: string;
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export const Select = ({
    title,
    label,
    options,
    onChange,
    value,
    className,
}: ISelectProps) => {
    const id = useId();
    return (
        <div className={styles.wrapper}>
            {
                // If title is provided, render a label
                label && (
                    <label className={styles.label} htmlFor={id}>
                        {title}
                    </label>
                )
            }
            <select
                title={title}
                id={id}
                className={`${styles.select} ${className}`}
                value={value}
                onChange={onChange}
                name={title}
                aria-label={label}
                aria-labelledby={id}
            >
                {options.map((option) => (
                    <option
                        className={styles.option}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
