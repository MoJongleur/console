import React, {useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {jsonDelete} from '../../../store/actions/json';
import {useDispatch} from 'react-redux';
import {grayColor_02, whiteColor} from '../../../helpers/commonStyles';
import {JsonElement} from '../../../store/reducers/json';

const ElementOfHistory = styled.div`
  height: 30px;
  padding: 5px 0 5px 5px;
  margin-left: 5px;
  background: ${whiteColor};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  position: relative;
`;

const StatusOfElement = styled.img`
  padding: 5px 0 5px 5px;
`;

const DropdownMenu = styled.div`
  display: block;
  position: absolute;
  background-color: ${whiteColor};
  min-width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  left: 0;
  top: 25px;
  z-index: 2;
  padding: 5px 0;
`;

const TextOfElement = styled.div`
  padding: 0 10px 0 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  position: relative;
`;

const DotsOfElement = styled.img`
  cursor: pointer;
`;

const UlTest = styled.div`
  margin-right: 12px;
`;

const Rentagle = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 5px 0;
  width: 100%;
`;

const DropDownButton = css`
  padding: 15px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

const DropDownDo = styled.div`
  ${DropDownButton}
`;

const DropDownCopy = styled.div`
  ${DropDownButton}
  
  &:hover {
    background-color: #0055FB;
    color: ${whiteColor};
  }
`;

const DropDownDelete = styled.div`
  ${DropDownButton}
  
  &:hover {
    background-color: #CF2C00;
    color: ${whiteColor};
  }
`;

const rotation = keyframes`
    0% {
      transform: translateY(0);
      opacity: .9;
    }
    100% {
      transform: translateY(-40px);
      opacity: .0;
    }
  `;

const StyledDiv = css`
  animation: ${rotation} 3s;
`;

const CopyBlock = styled.div`
  position: absolute;
  width: auto;
  height: 20px;
  left: 22px;
  top: 5px;
  background: ${grayColor_02};
  border-radius: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  font-family: SF Pro Text;
  padding: 0 5px;
  z-index: 999;
  ${StyledDiv}
`;

interface Props {
  index: number;
  element: JsonElement;
  replyPoke: (data: string) => void;
}

export default function Element({index, element, replyPoke}: Props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  const [copyElem, setCopyElem] = useState<JSX.Element | null>(null);

  const handleDo = () => {
    replyPoke(element.query);
    setDropdownVisible(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(element.query, null, '\t'));

    const elem: JSX.Element = <CopyBlock>Скопировано</CopyBlock>;
    setCopyElem(elem);
    setTimeout(() => {setCopyElem(null)}, 2500);
    setDropdownVisible(false);
  };

  const handleDelete = () => {
    dispatch(
      jsonDelete({count: index})
    );
    setDropdownVisible(false)
  };

  const Text = Object.values(element.query)[0];

  return (
    <ElementOfHistory>
      <StatusOfElement src={element.error ? '/icons/ellipse_red.svg' : '/icons/ellipse_green.svg'} alt=""/>
      <TextOfElement>
        {Text}
      </TextOfElement>
      {copyElem}
      <UlTest onMouseEnter={ () => { setDropdownVisible(true) }}
              onMouseLeave={() => { setDropdownVisible(false)}}>
        <DotsOfElement src={'/icons/dots.svg'} alt=""/>
        {dropdownVisible ?
          <DropdownMenu>
            <DropDownDo onClick={handleDo}>Выполнить</DropDownDo>
            <DropDownCopy onClick={handleCopy}>Скопировать</DropDownCopy>
            <Rentagle />
            <DropDownDelete onClick={handleDelete}>Удалить</DropDownDelete>
          </DropdownMenu>
          : ''
        }
      </UlTest>
    </ElementOfHistory>
  )
}
