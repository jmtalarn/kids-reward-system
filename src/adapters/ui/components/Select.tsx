//import { ComponentProps, ReactNode, CSSProperties } from 'react';
import { ReactNode, CSSProperties } from 'react';

import styles from './Select.module.css';
import ReactSelect, { Props, GroupBase } from 'react-select';

type AdditionalProperties = {
  label?: string;
  children?: ReactNode;
  fieldStyle?: CSSProperties;
  options?: Props;
};

const CustomStyle = {
  container: (base: object) => ({
    ...base,
    width: "100%"
  }),
  multiValue: (base: object) => ({
    ...base,
    borderRadius: "5px",
    backgroundColor: 'var(--color-primary-700)'
  }),
  control: (base: object) => ({
    ...base,
    boxShadow: 'var(--box-shadow-inner)',
  }),
  option: (base: object) => ({
    ...base,
    color: 'black',
    //   backgroundColor: state.isSelected ? 'var(--color-primary-200)' : state.isFocused ? 'var(--color-primary-600)' : 'transparent',
  }),
};

type SelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = Props<Option, IsMulti, Group> & AdditionalProperties;

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) => {

  const { label, children, fieldStyle, options, id, ...restProps } = props;
  return (
    <div className={styles.field} style={fieldStyle}>
      <div className={styles['field-input']}>
        <label htmlFor={id}>{label}</label>
        <ReactSelect
          {...restProps}
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
