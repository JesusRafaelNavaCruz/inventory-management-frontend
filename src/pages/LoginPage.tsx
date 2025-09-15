import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/auth-slice";
import { useLoginMutation } from "../slices/authApiSlice";
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const userData = await login({email: user,password: pwd}).unwrap();
      dispatch(setCredentials({ ...userData, user }))
      setUser('');
      setPwd('');
      navigate('/');
    } catch(e: any) {

      if (!e?.status) {
        setErrMsg('No server response');
      } else if (e.status === 400){
        setErrMsg('Usuario o contraseña incorrectos');
      } else {
        setErrMsg('Error al iniciar sesión');
      }
      if (errRef.current) {
        errRef.current.focus();
      }

    }
  }

  const handleUserInput = (e:any) => setUser(e.target.value);
  const handlePwdInput = (e: any) => setPwd(e.target.value);  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Inventory Management</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Correo electronico
            </label>
            <input
              ref={userRef}
              value={user}
              onChange={handleUserInput}
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="ejemplo@abc.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Contraseña
            </label>
            <input
              value={pwd}
              onChange={handlePwdInput}
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="ej. 1234"
              required
            />
          </div>

          {/* <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-500" />
              Recuérdame
            </label>
            <a href="#" className="text-purple-300 hover:text-white transition">
              ¿Olvidaste tu contraseña?
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
