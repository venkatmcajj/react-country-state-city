import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Country } from "../types";
import { GetCountries } from "../utils";
import PhonecodeDropdown from "./PhonecodeDropdown";

type PageProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultValue?: Country;
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: Country) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  showFlag?: boolean;
  region?: string;
};
const PhonecodeSelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  showFlag,
  region,
  ...props
}: PageProps) => {
  const [countriesunfiltered, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    GetCountries(region).then((data) => {
      setCountries(data);
    });
  }, [region]);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <PhonecodeDropdown
          {...props}
          placeHolder={placeHolder}
          options={countriesunfiltered}
          onChange={(value) => {
            if (onChange) {
              onChange(value as Country);
            }
          }}
          showFlag={showFlag}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default PhonecodeSelect;
