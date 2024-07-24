import LoginForm from '@/components/LoginForm'
import LoginGithub from '@/components/LoginGithub'
import LoginGoogle from '@/components/LoginGoogle'

export default function SignIn() {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Login</h1>
        <LoginForm />
        <LoginGithub />
        <LoginGoogle />
      </section>
    </div>
  )
}
