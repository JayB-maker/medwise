import "./Search.scss";

interface SearchProps {
  className?: string;
  placeholder?: string;
  isIconRight?: boolean;
  onChange?: Function;
  value?: string;
  id?: string;
  name?: string;
  invertStyle?: boolean;
}

const Search = (props: SearchProps) => {
  const {
    isIconRight,
    placeholder,
    className,
    onChange,
    value,
    id,
    name,
    invertStyle,
  } = props;
  return (
    <>
      <div
        className={`search-input ${
          invertStyle ? "search-input-invert" : ""
        } ${className}`}
      >
        {!isIconRight && <img src="assets/search.png" alt="search" className="search" /> }
        <input
          type="search"
          placeholder={placeholder ? placeholder : "Search..."}
          className={isIconRight ? "input-shift" : ""}
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
          id={id}
          name={name}
        />
        {isIconRight && <img src="assets/search.png" alt="search" className="search" />}
      </div>
    </>
  );
};

export default Search;
