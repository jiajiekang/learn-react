import React from "react";

import HandleSearch from "./HandleSearch";

export default function Platforms({ options, onOptions, onSearch }) {
  return (
    <form>
      {options.map(({ id, checked, label, value }) => {
        return (
          <React.Fragment key={id}>
            <label>
              <input
                onChange={(e) => onOptions(id, e.target.checked)}
                value={value}
                type="radio"
                name="pf"
                checked={checked}
              />
              {label}
            </label>
          </React.Fragment>
        );
      })}
      <HandleSearch onSearch={onSearch} />
    </form>
  );
}
