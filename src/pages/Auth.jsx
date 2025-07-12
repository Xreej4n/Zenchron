import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../firebaseAuth";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !username)) {
      alert("Please fill in all fields");
      return;
    }

    try {
      let uid;
      if (isLogin) {
        uid = await login(email, password);
        localStorage.setItem("user", JSON.stringify({ uid, email }));
      } else {
        uid = await register(email, password, username);
        localStorage.setItem("user", JSON.stringify({ uid, email, username }));
      }

      navigate("/");
    } catch (error) {
      alert("Authentication failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center px-4 py-10">
      <div className="auth-wrapper">
        <h2 className="auth-title">{isLogin ? "Welcome Back" : "Create Account"}</h2>

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

        <button className="auth-button" onClick={handleAuth}>
          {isLogin ? "Log In" : "Register"}
        </button>

        <div className="auth-switch mt-4 text-sm text-white">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={() => setIsLogin(false)} className="underline text-blue-300">
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsLogin(true)} className="underline text-blue-300">
                Log in here
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}