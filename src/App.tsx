import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css'
import SignIn from './app/signin'
import { Layout } from './app/layout';
import Dashboard from './app/home';
import Categories from './app/categories';

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" exact element={<SignIn />} />
          {/* other routes */}

          <Route path="" element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <Dashboard />
              }
            />

            <Route
              path="/category"
              element={
                <Categories />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
