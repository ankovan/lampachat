// @ts-nocheck
import React from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Link, Code, Image } from "@nextui-org/react";

export default function Message({ username, userMessage, date, isSystem }) {
  return (
    <div className={isSystem ? 'system-message p-2 m-4 text-center text-primary opacity-40 flex justify-center' : 'user-message p-2 m-4 text-foreground'}>
      { isSystem ? <></> : (
        <div className="flex gap-2 items-center my-1.5">
          <div className="font-bold">{username}</div>
          <div className="text-sm">{date}</div>
        </div>
      ) }      
      <div>
        {
          userMessage.split('<br/>').map((item, index) => (
            <Markdown 
              components={{
                a(props) {
                  const {node, ...rest} = props
                  return <Link color="secondary" {...rest} />
                },
                img(props) {
                  const {node, ...rest} = props
                  return <Image alt="" width={400} {...rest} />
                }, 
                code: Code, 
                // img: Image 
                }} 
              remarkPlugins={[remarkGfm]} key={index}>
                {item}
            </Markdown>
          ))
        }
      </div>
    </div>
  );
}
