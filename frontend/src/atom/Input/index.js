import { StyledTextField } from "./style";

function Input({ label, onChange }) {
  return <StyledTextField label={label} onChange={onChange} />;
}

export default Input;
