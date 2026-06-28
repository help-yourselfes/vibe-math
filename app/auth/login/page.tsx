import { AuthForm } from "@/components/auth/AuthForm"
import { HeroBackground } from "@/components/ui/HeroBackground"

export default function LoginPage() {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <HeroBackground />
      <div className="relative z-10 w-full px-4">
        <AuthForm />
      </div>
    </div>
  )
}
