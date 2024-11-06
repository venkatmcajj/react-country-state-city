import React, {
    ChangeEvent,
    InputHTMLAttributes,
    useEffect,
    useState,
  } from "react";
  import { Region } from "../types";
  import { GetRegions } from "../utils";
  import Dropdown from "./Dropdown";
  
  type PageProps = InputHTMLAttributes<HTMLInputElement> & {
    defaultValue?: Region;
    containerClassName?: string;
    inputClassName?: string;
    onChange?: (e: Region) => void;
    onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeHolder?: string;
  };
  const RegionSelect = ({
    containerClassName,
    inputClassName,
    onTextChange,
    defaultValue,
    onChange,
    placeHolder,
    ...props
  }: PageProps) => {
    const [regionsunfiltered, setRegions] = useState<Region[]>([]);
    useEffect(() => {
      GetRegions().then((data) => {
        setRegions(data);
      });
    }, []);
    return (
      <>
        <div className={containerClassName} style={{ position: "relative" }}>
          <Dropdown
            {...props}
            placeHolder={placeHolder}
            options={regionsunfiltered}
            onChange={(value) => {
              if (onChange) {
                onChange(value as Region);
              }
            }}
            onTextChange={onTextChange}
            defaultValue={defaultValue}
            inputClassName={inputClassName}
          />
        </div>
      </>
    );
  };
  
  export default RegionSelect;
  