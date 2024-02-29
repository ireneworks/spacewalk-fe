import { PropsWithChildren, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onClose(): void;
}

export default function Dialog({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  const onCloseHandler = useCallback(() => {
    onClose();
  }, [onClose]);

  return isOpen
    ? createPortal(
        <Scrim onClick={onCloseHandler}>
          <Contents onClick={(event) => event.stopPropagation()}>
            {children}
          </Contents>
        </Scrim>,
        document.body,
      )
    : null;
}

const Scrim = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 0;
  margin: 0;
`;
