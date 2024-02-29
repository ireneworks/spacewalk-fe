import { useState } from "react";
import Filter from "./components/filter/Filter";
import Sort from "./components/sort/Sort";

function App() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("created");

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
      <Sort
        selected={sort}
        onApply={setSort}
        options={[
          { text: "작성일 순", value: "created" },
          { text: "수정일 순", value: "updated" },
          { text: "코멘트 순", value: "comments" },
        ]}
      />
    </>
  );
}

export default App;
