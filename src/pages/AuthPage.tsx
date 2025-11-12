import { useState } from 'react';
import { LoginForm } from '../features/auth/LoginForm';
import { SignupForm } from '../features/auth/SignupForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};