import React from "react";
import Chat from "@/components/Chat";
import WelcomeModal from "@/components/WelcomeModal";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  return (
    <>
      <WelcomeModal/>
      <Chat/>
      <SideMenu/>
    </>
  );
}

