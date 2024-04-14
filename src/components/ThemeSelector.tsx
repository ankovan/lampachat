"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["default"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown className="text-foreground">
      <DropdownTrigger>
        <Button
          className="border-divider" 
          variant="bordered"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="default">default</DropdownItem>
        <DropdownItem key="number">number</DropdownItem>
        <DropdownItem key="date">date</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
