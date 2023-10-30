import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "./utils/ErrorBoundary";
const Home = lazy(() => import("./pages/Home.tsx"));
const Signin = lazy(() => import("./pages/Signin.tsx"));
const Signup = lazy(() => import("./pages/Signup.tsx"));
const Movies = lazy(() => import("./pages/Movies.tsx"));
const Player = lazy(() => import("./pages/Player.tsx"));
const Title = lazy(() => import("./pages/Title.tsx"));

function App() {
  const { t } = useTranslation();
  return (
    <div className="body-box">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={t("Loading")}>
                <Home />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={t("Loading")}>
                <Signin />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={t("Loading")}>
                <Signup />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/movies"
            element={
              <Suspense fallback={t("Loading")}>
                <Movies />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/player"
            element={
              <Suspense fallback={t("Loading")}>
                <Player />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/title"
            element={
              <Suspense fallback={t("Loading")}>
                <Title />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="*"
            element={
              <Suspense fallback={t("Loading")}>
                <Navigate to="/" />
              </Suspense>
            }
            errorElement={<ErrorBoundary />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
