import Dialog from "../dialog/Dialog";
import React, { useCallback, useState } from "react";

export default function Filter() {
  const [open, toggleOpen] = useState(false);

  const onChangeDialogHandler = useCallback(() => {
    toggleOpen(!open);
  }, [open]);

  return (
    <>
      <button onClick={onChangeDialogHandler}>이슈 상태</button>
      <Dialog isOpen={open} onClose={onChangeDialogHandler}>
        <h1>이슈 상태</h1>
        <ul>
          <li>
            <button>전체</button>
          </li>
        </ul>
      </Dialog>
    </>
  );
}
