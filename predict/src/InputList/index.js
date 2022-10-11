import Input from "../atom/Input";
import map from "lodash/map";
import { useCallback } from "react";
import { InputListLayout } from "./style";

function InputList({ paramsTable, temParams, setTemParams }) {
  const handleChange = useCallback(
    (param) => {
      return (e) => {
        const temp = { ...temParams };
        temp[param] = e.target.value;
        setTemParams(temp);
      };
    },
    [temParams, setTemParams]
  );

  return (
    <InputListLayout>
      {map(paramsTable, (param, index) => {
        return (
          <Input key={index} label={param} onChange={handleChange(param)} />
        );
      })}
    </InputListLayout>
  );
}

export default InputList;
