import * as React from "react";
import { GestureResponderEvent, Text, Pressable } from "react-native";
import { cn } from "../lib/utils";

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
  className?: string;
}

export function Button({ text, onClick, className }: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "max-w-[200px] rounded-lg bg-blue-500 px-8 py-3.5",
        className
      )}
      onPress={onClick}
    >
      <Text className="text-center text-base text-white">{text}</Text>
    </Pressable>
  );
}
