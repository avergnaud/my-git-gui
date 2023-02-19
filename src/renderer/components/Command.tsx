import CommandButton from "./CommandButton";
import { useState } from 'react';
import './Command.css';

interface CommandProps {
    command: string;
  }

export default function Command(props: CommandProps) {

    return (
      <>
        <span className="textbox readonly">
            git {props.command}
        </span>
        <CommandButton 
            command={props.command}
        />
      </>
    );
  }
  