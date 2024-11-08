import React from 'react';
import InputField from './inputField';
import Button from './button';


type SearchBarProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSearch: () => void;
  inputPlaceholder: string;
  searchButtonText: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ inputValue,
  setInputValue,
  onSearch,
  inputPlaceholder,
  searchButtonText,
  }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    };
  return (
    <div className="search-bar d-flex">
      <InputField
        type="text"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <Button onClick={onSearch} label={searchButtonText} icon='fa fa-search me-2'></Button>
    </div>
  );
};

export default SearchBar;
