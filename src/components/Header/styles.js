import styled from 'styled-components';
import menuimg from '../../assets/img/menu.svg';
export const Header = styled.div`
  width: 100%;
  ${(props) => props.showMenu && `height: 100vh`};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  @media screen and (min-width: 414px) {
    ${(props) => props.screenWidth > 414 && `height: auto`}
  }
`;

export const Logo = styled.div`
  background: gold;
  width: 100px;
  height: 50px;
  margin-top: 10px;
`;

export const MenuToggle = styled.div`
  background: no-repeat url(${menuimg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 30px;
  height: 45px;
  margin: 10px;
  cursor: pointer;
  @media screen and (min-width: 414px) {
    display: none;
  }
`;

export const Menu = styled.ul`
  display: ${(props) => (props.showMenu ? 'flex' : 'none')};
  height: ${(props) => (props.showMenu ? '90vh' : 'auto')};
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
  font-size: 25px;
  @media screen and (min-width: 414px) {
    font-size: 17px;
    display: flex;
    flex-direction: row;
  }
`;

export const MenuItem = styled.li`
  list-style: none;
  margin: 10px;
  > a {
    color: ${(props) =>
      props.className === props.activeBtn ? 'blue' : 'black'};
  }
`;
