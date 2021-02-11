import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from 'src/store/actions';
import {QuitButtonNormal} from 'src/helpers/commonStyles';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  div {
    margin-left: 20px;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AccountBlock = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 15px;
  margin-right: 30px;
`;

const QuitBlock = styled.div`
  display: flex;
  margin-right: 30px;
  cursor: pointer;
  div {
    padding-right: 10px;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const [fullScreen, setScreen] = useState(false);

  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(
      logout()
    )
  };

  const handleFullScreen = () => {

    if(fullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      const docElm = document.documentElement;

      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    }
    setScreen(!fullScreen)
  };

  return (
    <>
      <LogoContainer>
        <img src="/icons/logo.svg" alt="" />
        <div>API-консолька</div>
      </LogoContainer>
      <ActionContainer>
        <AccountBlock>
          <div>{`${auth.login} ${auth.sublogin ? ': ' + auth.sublogin : ''}`}</div>
        </AccountBlock>
        <QuitBlock onClick={handleLogout}>
          <div>Выйти</div>
          <img src="/icons/log-out.svg" alt=""/>
        </QuitBlock>

        <QuitButtonNormal onClick={handleFullScreen} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          { !fullScreen ?
            <path d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          :
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        </QuitButtonNormal>
      </ActionContainer>
    </>
  )
}