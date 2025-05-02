import React from 'react';
import HeaderSearchBar from './headerSearchBar';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const HeaderSearchTitle: React.FC<Props> = ({ value, onChange, onSubmit }) => {
  return (
    <HeaderSearchBar
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default HeaderSearchTitle;
