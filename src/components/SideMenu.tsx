"use client"
import React from "react";
import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import UserList from "./UserList";

export default function SideMenu() {
  const users = useSelector((state: RootState) => state.users.users)
  return (
    <div className="bg-background flex flex-col p-4 w-1/4 rounded-none border-l border-divider">
      <p className="font-bold text-center text-primary">users</p>
      <div className="text-foreground h-3/6 scrollbar scrollbar-thumb-primary scrollbar-track-background h-32 overflow-y-scroll">
        <UserList/>
      </div>
    </div>
  );
}