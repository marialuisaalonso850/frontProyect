import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const goto = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          gmail,
          password
        })
      });

      const json = await response.json();
      if (response.ok) {
        console.log("El usuario se creó correctamente");
        setErrorResponse("");
        goto("/Login");
      } else {
        console.log("Algo malo ocurrió :o");
        setErrorResponse(json.error || "Ocurrió un error al crear el usuario.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorResponse("Ocurrió un error al enviar la solicitud.");
    }
  }

  return (
    <DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
          <div className="img-area">
            <img src="https://i.ibb.co/b5JYgx6/43a26b3f-306e-467e-9bd6-b7be20f9ef82.jpg" alt="imagen" />
          </div>
          <div className="form-area">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Signup</h1>
              {errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <label>Nombre</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label>Email</label>
              <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} />
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Create Usuario</button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
