import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Dummy validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // On successful login
      setError('');
      setIsLoading(false);
      
      // Redirect to dashboard
      window.location.href = '/dashboard'; // Change this to your actual dashboard path
      
      // Alternatively, you could use:
      // window.location.pathname = '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#204473]">Clinic Login</h2>
          <p className="text-[#3F618C]">Enter your credentials</p>
        </div>

        {error && (
          <div className="p-3 text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#3F618C]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6AC4D9]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F618C]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6AC4D9]"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-[#6AC4D9] focus:ring-[#6AC4D9]"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-[#3F618C]">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-[#204473] text-white rounded-md hover:bg-[#3F618C] focus:outline-none focus:ring-2 focus:ring-[#6AC4D9] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm text-[#3F618C]">
          <a href="#" className="text-[#6AC4D9] hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;