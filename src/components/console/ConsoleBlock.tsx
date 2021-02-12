import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {grayColor_01, redColor} from '../../helpers/commonStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
// @ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';
import {JsonEditor} from '../../containers/ConsolePage';

const InputMixinStyle = {
  boxSizing: 'border-box',
  borderRadius: '5px',
  resize: 'none',
  height: '95%',
  zIndex: 1
};

const ContentDrag = styled.img`
  width: 10px;
  cursor: col-resize;
`;

const InputWrapperLeft = styled.div<{width:number}>`
  width: calc(50% + ${(props: {width: number}) => props.width}px);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputWrapperRight = styled.div<{width:number}>`
  width: calc(50% - ${(props: {width: number}) => window.innerWidth/2 - props.width < 35 ? window.innerWidth/2-35 : props.width}px);
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

interface WindowSize {
  x: number;
}

export default React.forwardRef((props: {}, ref: any) => {

  const [size, setSize] = useState<WindowSize>({ x: Number(localStorage.getItem('widthWindow')) || 0 });
  const error = useSelector((state: RootState) => state.error.jsonErrorStructure);
  const json = useSelector((state: RootState) => state.json);
  const responseRef = useRef<JsonEditor>(null);

  const { responses, status } = json;

  const prevCountRef = useRef<string>(status);

  useEffect(() => {
    if(status != prevCountRef.current && status === 'success' && responseRef.current != null) {
      responseRef.current.jsonEditor.setText(responses[0].response);
    }
    prevCountRef.current = status;
    localStorage.setItem('widthWindow', String(size.x));
  });

  const handler = useCallback(() => {
    function onMouseMove(e: MouseEvent): void {
      e.preventDefault();
      console.log(window.innerWidth)
      setSize(currentSize => ({
        x: currentSize.x + e.movementX
      }));
      console.log(size)
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  const handleChange = (data: any) => {
    if(ref && ref.current != null) {
      ref.current.jsonEditor.set(data)
    }
  };

  return (
    <>
      <InputWrapperLeft width={Number(localStorage.getItem('widthWindow') || 0)}>
        <InputLabel>Запрос:</InputLabel>
        <Editor
          mode="code"
          value={ref.current}
          enableSort={false}
          enableTransform={false}
          navigationBar={false}
          statusBar={false}
          onChange={handleChange}
          mainMenuBar={false}
          ref={ref}
          htmlElementProps={{style: error ? {color: redColor, border: `1px solid ${redColor}`, boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)', ...InputMixinStyle} : { ...InputMixinStyle, border: '1px solid rgba(0, 0, 0, 0.2)' }}}
        />
      </InputWrapperLeft>
      <ContentDrag src="/icons/dots.svg" alt="" onMouseDown={handler} />
      <InputWrapperRight width={Number(localStorage.getItem('widthWindow') || 0)}>
        <InputLabel>Ответ:</InputLabel>
        <Editor
          mode="view"
          disabled
          value={null}
          enableSort={false}
          enableTransform={false}
          navigationBar={false}
          statusBar={false}
          mainMenuBar={false}
          ref={responseRef}
          htmlElementProps={{style: responses.length > 0 && responses[0].error && responseRef.current && responseRef.current.jsonEditor.get() && status === "success" ? {color: redColor, border: `1px solid ${redColor}`, boxShadow: '0px 0px 5px rgba(207, 44, 0, 0.5)', ...InputMixinStyle } : { ...InputMixinStyle, border: '1px solid rgba(0, 0, 0, 0.2)' }}}
        />
      </InputWrapperRight>
    </>
  )
})