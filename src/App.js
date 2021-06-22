import './App.css';
import { Redirect, Route } from 'react-router-dom';
import CommonHeader from './components/Header/';
import ServicePage from './pages/Servicepage/';
import SignUp from './pages/Signup/';
import { useSelector } from 'react-redux';
import SignIn from './pages/Signin/';
import Mypage from './pages/Mypage/';
import MypageDetail from './pages/MypageDetail/';

function App() {
  const { token } = useSelector((state) => state.postInfo);

  return (
    <>
      <CommonHeader />
      <Route path="/" component={ServicePage} exact={true} />
      <Route path="/mypage/order" component={Mypage} exact={true}>
        {!token && <Redirect to="/login" />}
      </Route>
      <Route path="/mypage/order/:id" component={MypageDetail} />
      <Route path="/login" component={SignIn}>
        {token && <Redirect to="/" />}
      </Route>
      <Route path="/sign-up" component={SignUp}>
        {token && <Redirect to="/" />}
      </Route>
      <Route path="/logout" component={ServicePage} />
      <Route path="/purchased">{!token && <Redirect to="/login" />}</Route>
    </>
  );
}

export default App;
