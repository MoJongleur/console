import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {
  blueColor_01,
  grayColor_02,
  JSONButtonFocus, JSONButtonHover,
  JSONButtonNormal,
  NormalButton,
  whiteColor,
} from 'src/helpers/commonStyles';

import IsJsonString from '../helpers/IsJsonString';

import ConsoleBlock from '../components/console/ConsoleBlock';
import History from '../components/history/index';
import {jsonStructureFailure, resetFailure} from 'src/store/actions';
import {jsonPoke} from 'src/store/actions/json';
import Header from 'src/components/header';

const HeaderWrapper = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 15px;
  background: ${grayColor_02};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

const HistoryWrapper = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 0 0 10px;
  background: ${grayColor_02};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  height: calc(100vh - 170px);
  display: flex;
  background: ${whiteColor};
  padding: 0 15px;
`;

const FooterWrapper = styled.div`
  height: 70px;
  width: 100%;
  background: ${whiteColor};
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 15px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 110px;
  height: 40px;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  border: none;
  
  ${NormalButton}
  border-radius: 5px;
`;

const JsonPrettyButton = styled.div`
  display: inherit;
  cursor: pointer;
  
  div {
    padding-left: 8px;
  }
  
  ${JSONButtonNormal};
  
  &:hover {
    color: ${blueColor_01};
    ${JSONButtonHover};
  }
  
  &:focus {
    color: ${blueColor_01};
    ${JSONButtonFocus};
  }
`;

function ConsolePage({history}) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.sessionKey?.length);
  const json = useSelector((state) => state.json.responses);
  const textArea = useRef();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  const replyPoke = (data) => {
    textArea.current.value = JSON.stringify(data, null, '\t');
    dispatch(
      jsonPoke({value: textArea.current.value, json})
    );
  };

  const handleClick = () => {
    if(IsJsonString(textArea.current.value)) {
      dispatch(
        jsonPoke({value: textArea.current.value, json})
      );
    } else {
      dispatch(
        jsonStructureFailure()
      );
    }
  };

  const handleJsonPretty = () => {
    if(IsJsonString(textArea.current.value)) {
      textArea.current.value = JSON.stringify(JSON.parse(textArea.current.value), null, '\t')
      dispatch(
        resetFailure()
      );
    } else {
      dispatch(
        jsonStructureFailure()
      );
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <HistoryWrapper>
        <History replyPoke={replyPoke} />
      </HistoryWrapper>

      <ContentWrapper>
        <ConsoleBlock ref={textArea} />
      </ContentWrapper>

      <FooterWrapper>
        <SubmitButton type="submit" onClick={handleClick}>
          Отправить
        </SubmitButton>
        <div>
          @link-to-your-github
        </div>
        <JsonPrettyButton onClick={handleJsonPretty}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
              <path d="M21 10H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 6H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 18H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
          <div>Форматировать</div>
        </JsonPrettyButton>
      </FooterWrapper>
    </>
  );
}

export default withRouter(ConsolePage);
