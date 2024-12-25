import { useRef } from "react"

export const Login = () => {
  const formRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault();
    if (!formRef.current) return;
  
    const formData = new FormData(formRef.current);
    const user = formData.get('user');
    const password = formData.get('password');
  
    if (!password || !user) return;
  
    fetch('http://localhost:1234/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
      })
      .catch((error) => {
        console.error('There was a problem with the login request:', error);
      });
  
    console.log({ user, password });
  }
  

  return (
    <>
      <form ref={formRef}>
        <label>
          username:
          <input type="text" name="user" placeholder="username or email" />
        </label>
        <label>
          password:
          <input type="password" name="password" placeholder="password" />
        </label>
        <input type="button" value="enviar" onClick={(e) => handleSubmit(e)} />
      </form>
    </>
  )
}