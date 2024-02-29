import Filter from "./components/filter/Filter";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Filter
        selected={filter}
        onApply={setFilter}
        options={[
          { text: "전체", value: "all", overrideText: "이슈 상태" },
          { text: "open", value: "open" },
          { text: "closed", value: "closed" },
        ]}
      />
    </>
  );
}

export default App;
