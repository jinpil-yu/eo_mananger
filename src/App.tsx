import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import DashboardController from "./ui/dashboard/DashboardController";
import SignInSide from "./ui/login/SignInSide";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MemberSpecific from "./ui/member/MemberSpecific";
import NoticeSpecific from "./ui/notice/NoticeSpecific";

function App() {
  const auth = getAuth();
  let navigate = useNavigate();

  useEffect(() => {
    navigateByAuthState()
  }, [])

  async function navigateByAuthState(): Promise<void> {
    let isAuth = await checkAuth()
    return isAuth ? navigate(`/dashboard`) : navigate(`/signIn`)
  }

  async function checkAuth(): Promise<boolean|any> {
    return new Promise<boolean>(((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true)
        } else {
          resolve(false)
        }
      });
    }))
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardController />} />
      <Route path="signIn" element={<SignInSide />} />
    </Routes>
  );
}

export default App;
