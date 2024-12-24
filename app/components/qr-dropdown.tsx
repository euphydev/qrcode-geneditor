import { memo } from "react";

type QRDropdownProps = {
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function QRDropdown({ title, options, ...rest }: QRDropdownProps) {
  return (
    <article className="mb-5">
      {title && <label>{title}</label>}
      {options ? (
        <select
          className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-2 ml-3"
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}
    </article>
  );
}

export default memo(QRDropdown);
