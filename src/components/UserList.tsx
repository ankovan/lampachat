"use client"
import React from "react";
import type { RootState } from '@/store'
import { useSelector } from 'react-redux'

export default function UserList() {
  const users = useSelector((state: RootState) => state.users.users)
  return (
    <div>
      <div className="text-foreground">
        {Object.entries(users).map(([index, usersData]: [string, any]) => (
            <div key={index}>{ usersData.username }</div>
          ))}
      </div>
    </div>
  );
}