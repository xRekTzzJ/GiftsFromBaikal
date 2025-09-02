import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../store";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  {
    const loginMutation = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      loginMutation.mutate({ username, password });
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
            Вход в аккаунт
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Логин
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Ваш логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Пароль
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loginMutation.isPending ? "Вход..." : "Войти"}
            </button>

            {loginMutation.isError && (
              <p className="text-red-500">Ошибка входа</p>
            )}
          </form>
        </motion.div>
      </div>
    );
  }
}
