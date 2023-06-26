/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Chat } from "./components/Chat";

export default function Home() {
  return (
    <main className="grid place-content-center h-screen">
      <Chat />
    </main>
  );
}
