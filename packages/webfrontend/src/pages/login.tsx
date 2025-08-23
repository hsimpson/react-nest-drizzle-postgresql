import React from 'react';

export const Login = () => {
  const onLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div>
      <h1 className="p-4">Login</h1>
      <form onSubmit={onLogin} className="flex flex-col gap-4 p-4">
        <label>
          Email:
          <input type="text" name="email" placeholder="Email" />
        </label>

        <label>
          Password:
          <input type="password" name="password" placeholder="Password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
