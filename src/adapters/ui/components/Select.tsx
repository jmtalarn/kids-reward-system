'use client';
import { useEffect, useState, ComponentProps, ReactNode, CSSProperties } from 'react';
import styles from './Select.module.css';
import ReactSelect, { Props, StylesConfig } from 'react-select';

type AdditionalProperties = {
  label?: string;
  children?: ReactNode;
  fieldStyle?: CSSProperties;
  options?: Props;
};

const CustomStyle = {
  control: (base: any, state: any) => ({
    ...base,
    boxShadow: 'var(--box-shadow-inner)',
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: 'black',
    //   backgroundColor: state.isSelected ? 'var(--color-primary-200)' : state.isFocused ? 'var(--color-primary-600)' : 'transparent',
  }),
};

const Select = ({ label, children, fieldStyle, options, id, ...props }: ComponentProps<ReactSelect> & AdditionalProperties) => {
  return (
    <div className={styles.field} style={fieldStyle}>
      <div className={styles['field-input']}>
        <label htmlFor={id}>{label}</label>
        <ReactSelect
          {...props}
          instanceId={id}
          options={options}
          styles={CustomStyle}
          theme={theme => {
            return {
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'var(--color-primary-200)',
                primary25: 'var(--color-primary-500)',
                primary50: 'var(--color-primary-400)',
                primary75: 'var(--color-primary-600)',
              },
            };
          }}
        />
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default Select;
