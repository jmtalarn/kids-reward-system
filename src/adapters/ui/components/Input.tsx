import { ComponentProps, ReactNode, CSSProperties } from 'react';
import styles from './Input.module.css';
import Button from './Button';

type AdditionalProperties = {
  label?: string;
  children?: ReactNode;
  fieldStyle?: CSSProperties;
  fieldClassName?: string;
};

const Input = ({ label, children, fieldStyle, fieldClassName, ...props }: ComponentProps<'input'> & AdditionalProperties) => {
  return props.type === 'submit' ? (
    <Button type="submit" className={[fieldClassName].filter(Boolean).join(" ")}>{props.value}</Button>
  ) : (
    <div className={[styles.field, fieldClassName].filter(Boolean).join(" ")} style={fieldStyle}>
      <div className={styles['field-input']}>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />{props.type === "range" && <span style={{ width: "4rem" }}>{props.value}</span>}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default Input;
