import { ReactNode } from "react";
import styled, { css } from "styled-components";

// Styled component for the circle
const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  ${(props) => {
    switch (props.color) {
      case "red":
        return css`
          background-color: red;
        `;
      case "yellow":
        return css`
          background-color: yellow;
        `;
      case "green":
        return css`
          background-color: green;
        `;
      default:
        return css`
          background-color: grey;
        `; // Default color
    }
  }}
`;

// Styled component for the container
const Container = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  flex-direction: column;
`;

interface IndicatorProps {
  color: "red" | "yellow" | "green";
  label?: ReactNode;
}

export const Indicator: React.FC<IndicatorProps> = ({ color, label }) => (
  <Container>
    <Circle color={color} />
    <span>{label}</span>
  </Container>
);
