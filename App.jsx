import { useState } from "react";
<<<<<<< HEAD
import { letters } from "./data";
import Letter from "./Letter";
||||||| f5b9622
import { initialLetters } from "./data";
import Letter from "./Letter";
=======
import { letters } from "./data.js";
import Letter from "./Letter.js";
>>>>>>> refs/remotes/origin/learn

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const selectedCount = selectedIds.size;

  function handleToggle(toggledId) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={selectedIds.has(letter.id)}
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>You selected {selectedCount} letters</b>
        </p>
      </ul>
    </>
  );
}
