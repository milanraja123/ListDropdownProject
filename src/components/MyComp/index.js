import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { dummyNames } from "../../constants/dummy";
import { RxCross2 } from "react-icons/rx";

const MyComp = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownItems, setDropdownItems] = useState(dummyNames);
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredItems = dummyNames.filter(
      (item) =>
        item.includes(value.toLowerCase()) && !selectedItems.includes(item)
    );
    setDropdownItems(filteredItems);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleListItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setDropdownItems(dropdownItems.filter((i) => i !== item));
    setInputValue("");
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setDropdownItems([...dropdownItems, item]);
  };
  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    return names[0].charAt(0) + names[1].charAt(0);
  };

  return (
    <>
      <h1>Pick User</h1>
      <div className="App">
        <div className="input-container">
          <div ref={inputRef} className="input-box">
            {selectedItems.map((item) => (
              <div key={item} className="cookie">
                <div className="round-box">{getInitials(item)}</div>
                {item}
                <span
                  className="remove-button"
                  onClick={() => handleRemoveItem(item)}
                >
                  <RxCross2 />
                </span>
              </div>
            ))}

            <div className="drop-parent">
              <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="input-field"
              />
              {isInputFocused && (
                <>
                  <div className="list-dropdown">
                    <ul>
                      {dropdownItems.length > 0 ? (
                        dropdownItems.map((item) => {
                          return (
                            <li
                              key={item}
                              onClick={() => handleListItemClick(item)}
                            >
                              {item}
                            </li>
                          );
                        })
                      ) : (
                        <li>No Items left</li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComp;
