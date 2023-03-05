import { classNames } from 'shared/lib/classNames/classNames';
import React, {
  InputHTMLAttributes, memo, useEffect, useRef,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
  className?: string,
  value?: string;
  autofocus?: boolean,
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    autofocus,
    onChange,
    type = 'text',
    placeholder,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  return (
    <div className={classNames(cls.Input, {}, [])}>
      <div className={cls.placeholder}>
        {placeholder}
      </div>
      <input
        ref={ref}
        className={cls.input}
        type={type}
        value={value}
        onChange={onChangeHandler}
        {...otherProps}
      />
    </div>
  );
});
