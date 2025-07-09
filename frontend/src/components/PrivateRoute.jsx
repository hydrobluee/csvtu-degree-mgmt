// src/components/PrivateRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../services/api";

export default function PrivateRoute({ requiredRole }) {
  const [authed, setAuthed] = useState(undefined); // undefined=loading, false=unauth, true=ok
  const location = useLocation();

  useEffect(() => {
    api
      .get("/session", { withCredentials: true })
      .then((res) => {
        // if you care about role, check it here:
        if (!requiredRole || res.data.role === requiredRole) {
          setAuthed(true);
        } else {
          setAuthed(false);
        }
      })
      .catch(() => setAuthed(false));
  }, [requiredRole]);

  if (authed === undefined) {
    return <div>Loading...</div>; // or a spinner
  }
  if (!authed) {
    // Redirect to login, preserving the attempted path in state
    return (
      <Navigate
        to={`/login?role=${requiredRole}`}
        state={{ from: location }}
        replace
      />
    );
  }
  // Authorized → render child routes
  return <Outlet />;
}
