import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (isLogin) {
      localStorage.setItem("user", JSON.stringify({ username: email }));
    } else {
      localStorage.setItem("user", JSON.stringify({ username }));
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center px-4 py-10">
      <div className="auth-wrapper">
        <h2 className="auth-title">{isLogin ? "Welcome Back" : "Create Account"}</h2>

        {/* Input Fields */}
        {!isLogin && (
          <input
            type="text"
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button className="auth-button" onClick={handleAuth}>
          {isLogin ? "Log In" : "Register"}
        </button>

        {/* Switch Mode */}
        <div className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={() => setIsLogin(false)}>
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsLogin(true)}>
                Log in here
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}