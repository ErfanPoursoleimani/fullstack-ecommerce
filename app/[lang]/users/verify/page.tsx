// app/auth/verify/page.tsx

import { OtpForm } from "../../_components/auth/OtpForm";


export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <OtpForm
            phoneOrEmail="+98 912 *** **34"
          />
        </div>
      </div>
    </main>
  );
}