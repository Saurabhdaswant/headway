import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div  >
      <main >
        <h1>Welcome to Headway!</h1>
        <Link href="/login">Signin</Link>
      </main>
      <span >
        <Image src="/logo.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
      <footer>Made w/ 💙 </footer>
    </div>
  );
}