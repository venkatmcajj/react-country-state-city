import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Country } from "../types";
import { GetCountries } from "../utils";
import Dropdown from "./Dropdown";

type PageProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultValue?: Country;
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: Country) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  showFlag?: boolean;
};
const CountrySelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  showFlag,
}: PageProps) => {
  const [countriesunfiltered, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    GetCountries().then((data) => {
      setCountries(data);
    });
  }, []);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <Dropdown
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

export default CountrySelect;
