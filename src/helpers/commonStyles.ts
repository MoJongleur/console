import styled, {css} from 'styled-components';

export const whiteColor = '#FFFFFF';
export const grayColor_01 = '#999999';
export const grayColor_02 = '#F6F6F6';
export const grayColor_03 = '#C4C4C4';
export const redColor = '#CF2C00';
export const blackColor_01 = '#0D0D0D';
export const blueColor_01 = '#0055FB';
export const blueColor_02 = '#45A5FF';

export const gradient_01 = 'linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4';
export const gradient_02 = 'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;';
export const gradient_03 = 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;';
export const gradient_04 = 'linear-gradient(0deg, #C4C4C4, #C4C4C4), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%);';

// button

export const NormalFocusButton = css`
  background: ${gradient_01};
  border-radius: 5px;
  color: ${whiteColor};
  border: 2px solid ${blueColor_02};
  outline:none;
`;

export const HoverButton = css`
  background: ${gradient_02};
  border-radius: 5px;
  color: ${whiteColor};
`;

export const ActiveButton = css`
  background: ${gradient_03};
  border-radius: 5px;
  color: ${whiteColor};
`;

export const DisabledButton = css`
  background: ${gradient_04};
  border-radius: 5px;
  color: ${whiteColor};
`;

export const NormalButton = css`
  background: ${gradient_01};
  border-radius: 5px;
  color: ${whiteColor};
  &:focus {
    ${NormalFocusButton}
  }
  &:hover {
    ${HoverButton}
  }
  &:active {
    ${ActiveButton}
  }
  &:disabled {
    ${DisabledButton}
  }
`;

// exit button

export const QuitButtonHover = css`
  stroke: ${blueColor_01}
`;

export const QuitButtonFocus = css`
  stroke: ${blueColor_01};
  outline: 2px solid ${blueColor_02};
  outline-offset: 7px;
`;

export const QuitButtonNormal = styled.svg`
  stroke: ${blackColor_01};
  
  &:focus {
    ${QuitButtonFocus}
  }
  &:hover {
    ${QuitButtonHover}
  }
`;

export const JSONButtonHover = css`
  stroke: ${blueColor_01}
`;

export const JSONButtonFocus = css`
  stroke: ${blueColor_01};
  outline: 2px solid ${blueColor_02};
  outline-offset: 7px;
`;

export const JSONButtonNormal = css`
  stroke: ${blackColor_01};
`;
