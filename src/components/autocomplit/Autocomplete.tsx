import { useState } from 'react';
import { COUNTRIES } from '../../types';
import './autocomplit.css';
type IAutocomplete = {
  getForm?: (s: string) => void;
};

function Autocomplete(props: IAutocomplete) {
  const { getForm } = props;
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
      const match = COUNTRIES.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      setMatchContries(match);
      if (match.length !== 0) setVisble(true);
    }
    if (getForm) getForm(value); //передаем значение в форму выше
  }

  function hideContry(item: string) {
    setVisble(false);
    setValue(item);
    if (getForm) getForm(item);
  }

  return (
    <div className="autocomplete-wrapper">
      <label htmlFor="country" className="autocomplete-label">
        {' '}
        Country:
        <input
          name="country"
          value={value}
          type="text"
          onChange={handleInputChange}
          placeholder="Enter your country name"
          className="autocomplete-input"
          autoComplete="off"
        />
      </label>
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
