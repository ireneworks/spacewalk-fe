import Dialog from "../dialog/Dialog";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import iconBlack from "assets/icons/chevronDownBlack.png";
import iconBlue from "assets/icons/chevronDownBlue.png";

interface Option {
  value: string;
  text: string;
  overrideText?: string;
}

interface Props {
  options: Option[];
  selected: string;
  onApply(value: string): void;
}

export default function Filter({
  options,
  selected: currentSelected,
  onApply,
}: Props) {
  const [selected, setSelected] = useState("");
  const [open, toggleOpen] = useState(false);

  const onChangeHandler = useCallback((value: string) => {
    setSelected(value);
  }, []);

  const onChangeDialogHandler = useCallback(() => {
    toggleOpen(!open);
  }, [open]);

  const onSubmitHandler = useCallback(() => {
    onApply(selected);
    onChangeDialogHandler();
  }, [onApply, selected, onChangeDialogHandler]);

  const label = useMemo(() => {
    const found = options.find((option) => option.value === currentSelected);
    return found?.overrideText ?? found?.text;
  }, [options, currentSelected]);

  useEffect(() => {
    if (selected !== currentSelected) {
      setSelected(currentSelected);
    }
  }, [currentSelected]);

  return (
    <>
      <FilterButton
        isActive={label !== "이슈 상태"}
        onClick={onChangeDialogHandler}
      >
        {label}
      </FilterButton>
      <Dialog isOpen={open} onClose={onChangeDialogHandler}>
        <Title>이슈 상태</Title>
        <ContentWrapper>
          <ul>
            {options.map(({ value, text }) => (
              <li key={value} onClick={() => onChangeHandler(value)}>
                <OptionButton isActive={value === selected}>
                  {text}
                </OptionButton>
              </li>
            ))}
          </ul>
          <SubmitButton onClick={onSubmitHandler}>적용</SubmitButton>
        </ContentWrapper>
      </Dialog>
    </>
  );
}

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 36px 8px 14px;
  border: 1px solid #dfe5eb;
  border-radius: 24px;
  background: url(${({ isActive }) =>
      isActive ? `${iconBlue}` : `${iconBlack}`})
    right 8px center / 24px no-repeat;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  font-size: 14px;
  line-height: 20px;
  color: ${({ isActive }) => (isActive ? "#1A8CFF" : "#14171A")};
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  color: #14171a;
`;

const ContentWrapper = styled.div`
  padding: 0 20px 20px;

  ul {
    display: flex;
    gap: 8px;
    padding-bottom: 32px;
  }
`;

const OptionButton = styled.button<{ isActive: boolean }>`
  padding: 10px 14px;
  border: ${({ isActive }) =>
    isActive ? "1px solid #1A8CFF" : "1px solid #dfe5eb"};
  border-radius: 30px;
  color: ${({ isActive }) => (isActive ? "#fff" : "#363B40")};
  background: ${({ isActive }) => (isActive ? "#1A8CFF" : "#fff")};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
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
