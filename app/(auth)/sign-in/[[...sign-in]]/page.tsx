import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="w-full h-screen flex bg-zinc-200 justify-center items-center"><SignIn />
  </div>
}