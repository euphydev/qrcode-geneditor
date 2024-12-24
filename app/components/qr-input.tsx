import { memo } from "react";

type QRInputProps = {
  className?: string;
  type: string;
  title?: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  step?: string | number;
};

function QRInput({ title, value, onChange, ...rest }: QRInputProps) {
  return (
    <article className="mb-5">
      {title && <label>{title}</label>}
      <input value={value} onChange={onChange} {...rest} />
    </article>
  );
}

export default memo(QRInput);
