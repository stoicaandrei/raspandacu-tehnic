import { NextPage } from 'next';
import { useState } from 'react';
import { useAuthActions } from 'contexts/AuthContext';

const LoginPage: NextPage = () => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-96 rounded bg-white p-6 shadow-none md:shadow-lg">
        <h1 className="text-3xl font-bold leading-normal">Sign in</h1>
        <p className="text-sm leading-normal">
          Access the hidden admin interface 👻
        </p>
        <div className="flex flex-col gap-3 pt-3">
          <input
            id="email"
            type="email"
            className="rounded border border-gray-500 p-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            className="rounded border border-gray-500 p-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded-full bg-blue-600 p-2 text-white"
            onClick={() => signIn(email, password)}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

LoginPage.hehe = 'hihi';
export default LoginPage;
