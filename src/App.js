import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const Form = ({showed}) => {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");

  const firstInput = useRef();

  useEffect(() => {
    // Actualizar el DOM
    if(showed) firstInput.current.focus();
  }, [showed])

  const sendForm = env => {
    env.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setTile("");
        setBody("");
      });
  };

  return (
    <form onSubmit={env => sendForm(env)}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={env => setTitle(env.target.value)}
          ref={firstInput}
        />
      </div>

      <div>
        <label htmlFor="body">Publicación</label>
        <textarea
          id="body"
          value={body}
          onChange={env => setBody(env.target.value)}
        />
      </div>

      <input type="submit" value="Enviar" />
    </form>
  );
};

export default function App() {
  const [show, setShow] = useState(false);
  return(
    <div>
      <button  onClick={ ()=> { setShow(true) } }>Mostrar formulario</button>
      {show && <Form showed={show}/>}
    </div>
  );
}
