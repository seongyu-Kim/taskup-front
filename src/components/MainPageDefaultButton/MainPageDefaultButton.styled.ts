import styled from 'styled-components';

interface Props {
  color: string;
  backgroundColor: string;
  border: string;
  borderRadius: string;
  width: string;
  height: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export const BaseButton = styled.button<Props>`
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position || 'auto'};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom || 'auto'};
  left: ${(props) => props.left || 'auto'};
  right: ${(props) => props.right || 'auto'};

  cursor: pointer;
`;
