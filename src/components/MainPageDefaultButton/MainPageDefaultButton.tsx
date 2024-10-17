import * as Styled from './MainPageDefaultButton.styled';

interface MainPageDefaultButtonProps {
  children: string;
  onClick: () => void;
  textColor?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'inherit';
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export default function MainPageDefaultButton({
  children,
  onClick,
  textColor = 'white',
  backgroundColor = '#9aaa30',
  border = 'none',
  borderRadius = '8px',
  width = '5rem',
  height = '30px',
  position = 'static',
  top,
  bottom,
  left,
  right,
}: MainPageDefaultButtonProps) {
  return (
    <Styled.BaseButton
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      position={position}
      top={top}
      bottom={bottom}
      left={left}
      right={right}>
      {children}
    </Styled.BaseButton>
  );
}
