import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import IssueList from "./pages/issueList/IssueList";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<IssueList />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
