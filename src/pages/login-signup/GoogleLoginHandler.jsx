import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGoogleLogin } from '../../features/auth/auth';

const GoogleLoginHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user_loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(handleGoogleLogin(location.search))
      .unwrap()
      .then(() => navigate('/'))
      .catch(() => navigate('/login'));
  }, [dispatch, location.search, navigate]);

  if (user_loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return null;
};

export default GoogleLoginHandler;