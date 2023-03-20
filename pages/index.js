import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Headway</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/headway.svg" />
      </Head>
      <main className="flex flex-col items-center gap-4 max-w-4xl  my-10 mx-auto ">
        <h1 className=" font-black text-6xl text-center  ">
          Create the life you want with daily habits using
          <p className="underline decoration-blue-400 ">Headway</p>
        </h1>
        <Link
          className=" font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-14 my-8 py-3 rounded text-lg text-white"
          href="/app"
        >
          Achieve greatness!
        </Link>
      </main>
    </div>
  );
}
