import React, { useState, useCallback, useEffect, memo } from 'react';
import { Header, Logo, Menu, MenuItem, MenuToggle } from './styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTokenSignOut } from '../../modules/postInfo';
import { deleteOrderItem } from '../../modules/getOrder';

const CommonHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [activeBtn, setActiveBtn] = useState(null);
  const { token } = useSelector((state) => state.postInfo);
  const dispatch = useDispatch();

  // 햄버거 메뉴 클릭시 메뉴 확장
  const onClickSpreadMenu = useCallback(() => {
    if (showMenu) setShowMenu(false);
    else setShowMenu(true);
  }, [showMenu]);

  // 해상도가 414px보다 높을 때에는 메뉴를 클릭해도 메뉴화면이 커지는 것을 막기 위해 기능 분리
  const onClickCollapseMenuByWidth = useCallback(
    (e) => {
      if (!token && e.target.className === 'mypage-link')
        setActiveBtn('login-link');
      else if (!token && e.target.className !== 'mypage-link')
        setActiveBtn(e.target.className);
      if (token) setActiveBtn(e.target.className);
      if (showMenu && screenWidth < 414) setShowMenu(false);
    },
    [showMenu, screenWidth, token],
  );

  const onClickSignOut = useCallback(() => {
    dispatch(deleteTokenSignOut());
    dispatch(deleteOrderItem());
  }, [dispatch]);

  const onClickCheckToken = useCallback(() => {
    if (!token) alert('로그인해주세요');
  }, [token]);

  // 메뉴창이 켜진 상태에서 브라우저의 크기를 넓힐경우 해당 메뉴를 다시 보이지 않게 만들기 위한 로직
  const getScreenWidth = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', getScreenWidth);
    return () => {
      window.removeEventListener('resize', getScreenWidth);
    };
  }, [getScreenWidth]);

  useEffect(() => {
    if (screenWidth > 414) setShowMenu(false);
  }, [screenWidth]);

  return (
    <>
      <Header showMenu={showMenu} screenWidth={screenWidth}>
        <Link to="/">
          <Logo />
        </Link>
        <Menu showMenu={showMenu} onClick={onClickCollapseMenuByWidth}>
          <MenuItem activeBtn={activeBtn} className="mypage-link">
            <Link
              to="/mypage/order"
              onClick={onClickCheckToken}
              className="mypage-link"
              style={{ textDecoration: 'none' }}
            >
              마이페이지
            </Link>
          </MenuItem>
          <MenuItem activeBtn={activeBtn} className="login-link">
            {/* 토큰을 받아왔을 경우 로그아웃으로 변경 */}
            {token ? (
              <Link
                to="/logout"
                onClick={onClickSignOut}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                로그아웃
              </Link>
            ) : (
              <Link
                to="/login"
                className="login-link"
                style={{ textDecoration: 'none' }}
              >
                로그인
              </Link>
            )}
          </MenuItem>
          <MenuItem activeBtn={activeBtn} className="signup-link">
            {/* 로그인이 되었다면 회원가입에 접근할 수 없도록 링크를 없애버림 */}
            {token ? (
              ''
            ) : (
              <Link
                to="/sign-up"
                className="signup-link"
                style={{ textDecoration: 'none' }}
              >
                회원가입
              </Link>
            )}
          </MenuItem>
        </Menu>
        <MenuToggle onClick={onClickSpreadMenu} />
      </Header>
    </>
  );
};

export default memo(CommonHeader);
