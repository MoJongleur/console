import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {grayColor_01, redColor} from 'src/helpers/commonStyles';
import {useSelector} from 'react-redux';

export const InputMixin = css`
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  resize: none;
`;

const LeftInput = styled.textarea`
  width: calc(50% + ${props => props.width}px);
  height: 95%;
  z-index: 1;
  
  ${InputMixin}
`;

const RightInput = styled.textarea`
  width: 100%;
  height: 95%;
  z-index: 1;
  
  ${InputMixin}
`;

const ContentDrag = styled.img`
  width: 10px;
  cursor: col-resize;
`;

const InputWrapperLeft = styled.div`
  width: calc(50% + ${props => props.width}px);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputWrapperRight = styled.div`
  width: calc(50% - ${props => props.width}px);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputLabel = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  margin: 10px 0 3px;
  color: ${grayColor_01};
`;

export default React.forwardRef((props, ref) => {

  const [size, setSize] = useState({ x: Number(localStorage.getItem('widthWindow')) || 0 });
  const error = useSelector((state) => state.error.jsonErrorStructure);
  const json = useSelector((state) => state.json);

  const { responses, status } = json;

  const [responseInput, setResponseInput] = useState('');
  const prevCountRef = useRef(status);

  useEffect(() => {
    if(status != prevCountRef.current && status === 'success') {
      setResponseInput(responses[0].response)
    }
    prevCountRef.current = status;

    localStorage.setItem('widthWindow', size.x);
  });

  const handler = useCallback(() => {
    function onMouseMove(e) {
      e.preventDefault();
      setSize(currentSize => ({
        x: currentSize.x + e.movementX
      }));
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <>
      <InputWrapperLeft width={localStorage.getItem('widthWindow') || 0}>
        <InputLabel>Запрос:</InputLabel>
        <LeftInput style={ error ? {color: redColor, border: `1px solid ${redColor}`, boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)'} : {}}
                   ref={ref}
                   type="text"
        />
      </InputWrapperLeft>
      <ContentDrag src="/icons/dots.svg" alt="" onMouseDown={handler} />
      <InputWrapperRight width={localStorage.getItem('widthWindow') || 0}>
        <InputLabel>Ответ:</InputLabel>
        <RightInput disabled
                    style={responses.length > 0 && responses[0].error && responseInput && status === "success" ? {color: redColor, border: `1px solid ${redColor}`, boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)'} : {}}
                    value={responseInput && status === "success" ? responseInput : ''}
                    type="text"
        />
      </InputWrapperRight>
    </>
  )
})
