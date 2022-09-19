// Modules
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

// Components
import ArrowDown from '../../Assets/Svg/ArrowDown';

// Styles
import "./_style.scss";

const Select = ({
    placeHolder,
    onChange,
    optionsList,
    name,
    id,
    defaultValue,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(optionsList["1"]);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    return selectedValue.label;
  };

  const onItemClick = (option) => {
    let newValue;
    if (option) {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    return selectedValue.value === option.value;
  };

  return (
    <div className="dropdown">
      <div onClick={handleInputClick} className={showMenu ? "dropdown__input dropdown__focus" : "dropdown__input"}>
        <div className="dropdown__selected-value">{getDisplay(optionsList["1"])}</div>
        <div className="dropdown__tools">
          <div className="dropdown__tool">
            <ArrowDown />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown__menu" name={name} id={id} defaultValue={defaultValue} onChange={onChange}>
            {optionsList && optionsList.map((option, index) => (
                <div key={`key-${index}`} value={option.value} onClick={() => onItemClick(option)} className={`dropdown__item ${isSelected(option) && "selected"}`}>
                    {option.label}
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
    defaultValue: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
}

export default Select;
