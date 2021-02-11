import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Element from 'src/components/history/children';
import {jsonClear} from 'src/store/actions';
import {grayColor_02, grayColor_03} from 'src/helpers/commonStyles';

const ClearHistoryBlock = styled.div`
  height: 100%;
  width: 50px;
  position: relative;
  right: 0;
  border-left: 1px ${grayColor_03} solid;
  background: ${grayColor_02};
  box-shadow: -6px 0px 15px 2px rgb(221 221 221);
`;

const ClearHistoryButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HeaderWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  position: relative;
  
  overflow-x: hidden;
  height: 500px;
`;

export default function History({replyPoke}) {
  const dispatch = useDispatch();
  const json = useSelector((state) => state.json);
  const wheelRef = useRef();

  useEffect(() => {
    wheelRef.current.addEventListener('wheel', event => {
      const toLeft  = event.deltaY < 0 && wheelRef.current.scrollLeft > 0;
      const toRight = event.deltaY > 0 && wheelRef.current.scrollLeft < wheelRef.current.scrollWidth - wheelRef.current.clientWidth;

      if (toLeft || toRight) {
        event.preventDefault();
        wheelRef.current.scrollLeft += event.deltaY
      }
    })
  }, []);

  const handleClear = () => {
    dispatch(
      jsonClear()
    )
  };

  const { responses } = json;

  return (
    <>
      <HeaderWrapper ref={wheelRef}>
        {responses.reverse().map((el, i) => (
          <React.Fragment key={i}>
            <Element index={i} element={el} replyPoke={replyPoke}/>
          </React.Fragment>
        ))}
      </HeaderWrapper>
      <ClearHistoryBlock>
        <ClearHistoryButton onClick={handleClear} src="/icons/cross.svg" alt=""/>
      </ClearHistoryBlock>
    </>
  )
}