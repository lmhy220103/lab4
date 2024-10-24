import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        localStorage.setItem("accessToken", user.accessToken);
        navigate("/admin/manager-orchid");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      navigate("/admin/manager-orchid");
    }
  }, [accessToken, navigate]);
  return (
    <Form
      style={{
        width: "500px",
        border: "1px solid #cacaca",
        padding: "10px 20px",
        position: "relative",
        top: "50%",
        left: "50%",
        borderRadius: "10px",
        transform: "translate(-50%, 50%)",
        backgroundColor: "#4285f4",
      }}
    >
      <div
        className="google-btn"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "176px",
          height: "40px",
          marginTop: "10px",
          backgroundColor: "transparent",
          left: "50%",
          transform: "translate(-50%)",
          cursor: "pointer",
        }}
        onClick={googleLogin}
      >
        <img
          className="google-icon"
          src="https://i.ibb.co/ydLySMx/google.png"
          alt="test-123"
          width={30}
          style={{
            background: "#fff",
            borderRadius: "2px",
          }}
        />
        <p
          className="btn-text"
          style={{
            marginBottom: 0,
            color: "#fff",
          }}
        >
          Sign up with Google
        </p>
      </div>
    </Form>
  );
};

export default Login;
