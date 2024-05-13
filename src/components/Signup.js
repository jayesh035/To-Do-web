import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credientials.name,
            email: credientials.email,
            password: credientials.password,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save auth token and redirect
        localStorage.setItem('token', json.authtoken);
        history.push("/");
        props.showAlert("Account created successfully","success")
      } else {
        props.showAlert("Invalid credentials","danger")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [credientials, setCredientials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const onChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
      <h2>Create an account  to iNotebook</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Email Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={credientials.name}
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credientials.email}
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credientials.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Conform Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={credientials.cpassword}
            name="cpassword"
            onChange={onChange}
          />
        </div>

        <button disabled={credientials.name.length<3 || credientials.password.length<5} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
