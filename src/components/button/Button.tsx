import styled from "styled-components";
import { PropsWithChildren } from "react";

interface Props {
  onClick(): void;
}
export default function Button({
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

const Wrapper = styled.button`
  background: #1a8cff;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
`;
