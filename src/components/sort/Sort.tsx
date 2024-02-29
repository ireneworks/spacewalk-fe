import { useCallback, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import chevron from "assets/icons/chevronDownGrey.png";
import check from "assets/icons/checkBlue.png";
import Dialog from "../dialog/Dialog";

interface Option {
  value: string;
  text: string;
}

interface Props {
  options: Option[];
  selected: string;
  onApply(value: string): void;
}

export default function Sort({ options, selected, onApply }: Props) {
  const [open, toggleOpen] = useState(false);

  const onCloseDialogHandler = useCallback(() => {
    toggleOpen(!open);
  }, [open]);

  const onChangeHandler = useCallback(
    (value: string) => {
      onApply(value);
      onCloseDialogHandler();
    },
    [onApply, onCloseDialogHandler],
  );

  const label = useMemo(() => {
    const found = options.find((option) => option.value === selected);
    return found?.text;
  }, [options, selected]);

  return (
    <>
      <SortButton onClick={onCloseDialogHandler}>{label}</SortButton>
      {open && (
        <Dialog isOpen={open} onClose={onCloseDialogHandler}>
          <Title>정렬</Title>
          <ContentWrapper>
            {options.map(({ value, text }) => (
              <li key={value}>
                <Button
                  isActive={selected === value}
                  onClick={() => onChangeHandler(value)}
                >
                  {text}
                </Button>
              </li>
            ))}
          </ContentWrapper>
        </Dialog>
      )}
    </>
  );
}

const SortButton = styled.button`
  padding-right: 24px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #5a6066;
  background: url(${chevron}) right center / 24px no-repeat;
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0;
  padding: 20px 20px 8px;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  color: #14171a;
`;

const ContentWrapper = styled.ul`
  padding-bottom: 12px;
`;

const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 15px 20px;
  background: ${({ isActive }) =>
    isActive ? css`url(${check}) right 16px center / 24px no-repeat` : "none"};
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  color: #363b40;
  cursor: pointer;

  &:hover {
    background-color: #f5f8fa;
  }
`;
