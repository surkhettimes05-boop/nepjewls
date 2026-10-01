export const metadata = {
  title: "Admin Sign In | NepJewls",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="min-h-screen bg-[#0F0D0C] text-[#E5E0D8] flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-[#1A1614] p-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8C857B] mb-4">NepJewls Ledger</p>
        <h1 className="font-serif text-4xl mb-3">Admin sign in</h1>
        <p className="text-sm text-[#8C857B] mb-10">Use the private administrator credentials configured in the deployment environment.</p>

        {hasError && (
          <div className="mb-6 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            Invalid email or password.
          </div>
        )}

        <form method="post" action="/api/admin/auth/login" className="space-y-6">
          <label className="block">
            <span className="block text-[10px] uppercase tracking-widest text-[#8C857B] mb-2">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="w-full border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </label>
          <label className="block">
            <span className="block text-[10px] uppercase tracking-widest text-[#8C857B] mb-2">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={12}
              required
              className="w-full border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </label>
          <button className="w-full bg-[#D4AF37] text-black py-3 text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
