import { useRef } from "react"
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/constant";

export const SignUp = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()

  async function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const user = formData.get('user')?.toString();
    const password = formData.get('password')?.toString();
    const email = formData.get('email')?.toString();

    if (!user || !password) {
      console.error("Usuario y contraseña son obligatorios");
      return;
    }

    try {
      const response = await fetch('http://localhost:1234/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || 'Unknown error'}`);
      }

      // const data = await response.json();
      navigate(PATHS.dashboard)
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
  }


  return (
    <form ref={formRef}>
      <label>
        username:
        <input type="text" name="user" placeholder="user" />
      </label>
      <label>
        email:
        <input type="text" name="email" placeholder="email" />
      </label>
      <label>
        password:
        <input type="password" name="password" placeholder="password" />
      </label>
      <input type="button" value="Registrarse" onClick={handleSubmit} />
    </form>
  )
}