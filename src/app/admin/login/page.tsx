'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from 'lucide-react';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await loginAction(formData);
    if (result?.error) {
      return { error: result.error };
    }
    return { error: '' };
  }, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md bg-[#14315c]/50 backdrop-blur-xl border-slate-700/50 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-gradient-to-tr from-amber-400 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">Welcome Back</CardTitle>
          <p className="text-slate-400 text-sm">Enter your credentials to access the dashboard</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-200 ml-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-black/40 border-slate-700/50 text-white placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-amber-500/20 h-11 transition-all"
              />
            </div>
            {state?.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {state.error}
              </div>
            )}
            <Button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-500 hover:to-amber-600 font-semibold h-11 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
