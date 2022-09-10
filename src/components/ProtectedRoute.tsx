import { Navigate } from 'react-router-dom';

type PropsType = {
  isAuth: boolean;
  redirectPath?: string;
  children: JSX.Element;
};

export const ProtectedRoute = ({ isAuth, redirectPath = '/sign-in', children }: PropsType) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
