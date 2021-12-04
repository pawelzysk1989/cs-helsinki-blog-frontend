import React from 'react';

type Props = {
  label: string;
  type?: 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
};

const InputField = ({ label, value, onChange, type = 'text' }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input
        className="form-field__control"
        type={type}
        value={value}
        onChange={handleInputChange}
      />
    </label>
  );
};

export default InputField;
