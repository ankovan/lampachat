export const parseCommand = (command) => {
  const parts = command.slice(1).split(' ');
  const commandBase = parts[0];
  const commandArgs = parts.slice(1);
  return executeParsedCommand(commandBase, commandArgs)
};

export const executeParsedCommand = ( commandBase, commandArgs) => {
  if (commandBase === "h" && !commandArgs.length) {
    console.log("h command is executed");
    const commandResponse = "all commands:<br/>/h - displaying all commands"
    return {
      id: "0000-0000-0000-0000",
      message: commandResponse,
      activeRoom: "Chatting",
    };
  } else {
    return {
      id: "0000-0000-0000-0000",
      message: "There is no such command",
      activeRoom: "Chatting",
    };
  }
};