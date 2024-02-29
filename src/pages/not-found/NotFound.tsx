import image from "assets/images/404.png";
import Button from "../../components/button/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NotFound() {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate("/home");
  }, []);

  return (
    <Container>
      <img src={image} width={300} alt="페이지를 찾을 수 없습니다." />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Button onClick={onClick}>홈으로 돌아가기</Button>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 80px;
`;
