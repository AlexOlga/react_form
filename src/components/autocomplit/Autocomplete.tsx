import { useState } from 'react';
import { CONTRIES } from '../../types';
import './autocomplit.css';

function Autocomplete() {
  const [matchСontries, setMatchContries] = useState(['']); // matching countries
  const [visible, setVisble] = useState(false); // visible list
  const [value, setValue] = useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setValue(value);
    if (!value) {
      setMatchContries([]);
      setVisble(false);
    } else {
      const match = CONTRIES.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      setMatchContries(match);
      console.log('match', match);
      if (match.length !== 0) setVisble(true);
    }
  }

  function hideContry(item: string) {
    setVisble(false);
    setValue(item);
  }

  return (
    <div className="autocomplete-wrapper">
      <input
        value={value}
        type="text"
        onChange={handleInputChange}
        placeholder="Enter your country name"
      />
      <ul
        className={'autocomplete-list ' + (visible ? 'visible' : 'invisible')}
      >
        {matchСontries.map((item) => (
          <li
            key={item}
            onClick={() => hideContry(item)}
            className="autocomplete-item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Autocomplete;
