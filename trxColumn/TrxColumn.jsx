import React from "react";

export default function TrxColumn({ checkboxes, onChangeCheck, onChangeSelectClear }) {
  return (
    <form>
      {checkboxes.map(({ id, checked, label, value }) => {
        return (
          <React.Fragment key={id}>
            <label>
              <input
                onChange={(e) => onChangeCheck(id, e.target.checked)}
                value={value}
                type="checkbox"
                name="checkbox"
                checked={checked}
              />
              {label}
            </label>
          </React.Fragment>
        );
      })}
      <button
        onClick={() => onChangeSelectClear(false)}
        class="check-btn clear-btn"
        type="button"
      >
        Clear
      </button>
      <button
        onClick={() => onChangeSelectClear(true)}
        class="check-btn select-btn"
        type="button"
      >
        Select All
      </button>
    </form>
  );
}
