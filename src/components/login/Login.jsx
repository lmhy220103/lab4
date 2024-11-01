import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const response = await fetch(
          "https://66ff148b2b9aac9c997e368a.mockapi.io/user"
        );
        const userList = await response.json();

        console.log(userList);
        let checkUser = userList.find(
          (user) => user.email === result.user.email
        );

        if (!checkUser) {
          fetch("https://66ff148b2b9aac9c997e368a.mockapi.io/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              role: 2,
              number: result.user.phoneNumber,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              checkUser = data;
              console.log("Success:", data);
              notification.success({
                message: "Login success",
              });

              localStorage.setItem("accessToken", user.accessToken);
              if (checkUser) {
                localStorage.setItem("user", JSON.stringify(checkUser));
              }
              if (checkUser.role === 1) {
                navigate("/admin/manager-orchid");
              } else {
                navigate("/home");
              }
            })
            .catch((error) => {
              console.log(error);
              notification.error({
                message: "Login failed",
              });
            });
        }

        const user = result.user;
        console.log(user);

        localStorage.setItem("accessToken", user.accessToken);
        if (checkUser) {
          localStorage.setItem("user", JSON.stringify(checkUser));
        }
        if (checkUser.role === 1) {
          navigate("/admin/manager-orchid");
        } else {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const accessToken = localStorage.getItem("accessToken");
  // const email = localStorage.getItem("email");
  // useEffect(() => {
  //   if (accessToken && email === "leminhhy2212003@gmail.com") {
  //     navigate("/admin/manager-orchid");
  //   } else if (accessToken && email) {
  //     navigate("/home");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [accessToken, email, navigate]);
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
