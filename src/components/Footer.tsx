import React from "react";
import {Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function Footer() {
  return (
    <Navbar isBlurred={false} maxWidth="full" className="border-t border-divider">
      <NavbarContent justify="center">
        <NavbarItem>
          <p className="text-primary">made by ankovan</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}