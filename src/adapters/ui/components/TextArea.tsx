import { ComponentProps, ReactNode, CSSProperties } from 'react';
import styles from './TextArea.module.css';

type AdditionalProperties = {
  label?: string;
  children?: ReactNode;
  fieldStyle?: CSSProperties;
};

const TextArea = ({ label, children, fieldStyle, ...props }: ComponentProps<'textarea'> & AdditionalProperties) => {
  return (
    <div className={styles.field} style={fieldStyle}>
      <div className={styles['field-input']}>
        <label htmlFor={props.id}>{label}</label>
        <textarea {...props}></textarea>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default TextArea;
