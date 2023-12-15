import HandleExId from "./HandleExId";

export default function ExternalIds({ ExIdRegex, onExIdChange, onFilter }) {
  return (
    <form>
      <fieldset>
        <legend>External ID</legend>
        <input
          value={ExIdRegex}
          onChange={(e) => onExIdChange(e.target.value)}
          type="text"
          placeholder="16\d+"
        />
        <input onClick={() => onExIdChange("")} type="reset" />
      </fieldset>
      <HandleExId onFilter={onFilter} />
    </form>
  );
}
