import { ComponentProps, ReactNode, CSSProperties } from 'react';
import styles from './Input.module.css';
import Button from './Button';

type AdditionalProperties = {
  label?: string;
  children?: ReactNode;
  fieldStyle?: CSSProperties;
};

const Input = ({ label, children, fieldStyle, ...props }: ComponentProps<'input'> & AdditionalProperties) => {
  return props.type === 'submit' ? (
    <Button type="submit">{props.value}</Button>
  ) : (
    <div className={styles.field} style={fieldStyle}>
      <div className={styles['field-input']}>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />{props.type === "range" && <span style={{ width: "4rem" }}>{props.value}</span>}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default Input;
