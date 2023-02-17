import './App.css';
import React from 'react';
import ElPricesPage from "./pages/ElPricesPage";
import TokenPage from './pages/TokenPage';
import { BrowserRouter,Switch, Routes ,Navigate, Route, Redirect, Outlet } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route  path="/" element ={<PublicLayout> <ElPricesPage/></PublicLayout>} > </Route>
          </Routes>
          <Routes>
              <Route  path="/token" element ={<PublicLayout> <TokenPage/></PublicLayout>} > </Route>
          </Routes>
      </BrowserRouter>
  );

}

export default App;
