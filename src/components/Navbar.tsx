import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ThemeSelector from "./ThemeSelector";

export default function NavigationBar() {
  return (
    <Navbar isBordered isBlurred={false} maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-primary">lampachat</p>
      </NavbarBrand>
      {/* <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSelector/>
        </NavbarItem>
      </NavbarContent> */}
    </Navbar>
  );
}