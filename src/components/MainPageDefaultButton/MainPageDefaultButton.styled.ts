import styled from 'styled-components';

export interface ButtonProps {
  borderRadius: string;
  textColor: string;
  backgroundColor: string;
  border: string;
  width: string;
  height: string;
  position: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export const BaseButton = styled.button<ButtonProps>`
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;
