import "./FileInput.scss";

interface FileInputProps {
  className?: string;
  labelText?: string;
  onChange?: Function;
  value?: string;
  id?: string;
  name?: string;
  invertStyle?: boolean;
  multiple?: boolean;
  isUploading?: boolean;
}

const FileInput = (props: FileInputProps) => {
  const { className, labelText, onChange, value, id, name, invertStyle, multiple, isUploading } =
    props;
  return (
    <>
      <div className="file-input">
        <label className={`${className} ${invertStyle ? "label-invert" : ""}`}>
          {labelText ? `${labelText} ` : "Select File "}
          <input
            type="file"
            // size={60}
            onChange={(e) => onChange?.(e.target.files)}
            value={value}
            id={id}
            name={name}
            multiple={multiple}
          />
        </label>
      </div>
    </>
  );
};

export default FileInput;