import React from 'react';

// Si estás usando TypeScript (.tsx), puedes declarar la interfaz Props
interface Props {
  info: string;
}

const InputRegistro = ({ info }: Props) => {
  return (
    <div className="v-col">
      <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-text-field">
        <div className="v-input__control">
          <div className="v-field v-field--center-affix v-field--variant-filled">
            <label className="v-label v-field-label" htmlFor="input-4">{info}</label>
            <input
              type="text"
              id="input-4"
              placeholder={info}
              className="v-field__input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRegistro;
