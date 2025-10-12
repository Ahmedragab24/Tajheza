"use client";

import type React from "react";
import { useRef } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Paperclip, ImageIcon, Send, MapPin } from "lucide-react";
import { MessageType } from "@/types/Chat";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";

interface MessageInputProps {
  newMessage: string | File;
  setNewMessage: (message: string | File) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleSendMessage: (type?: MessageType, payload?: File | string) => void;
  isLoading?: boolean;
  typeMessage?: MessageType;
  setTypeMessage?: (type: MessageType) => void;
}

const MessageInput = ({
  newMessage,
  setNewMessage,
  handleKeyPress,
  handleSendMessage,
  isLoading = false,
  setTypeMessage,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const lang = useLocale() as LangType;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTypeMessage?.("file");
      setNewMessage(file);
      handleSendMessage("file", file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTypeMessage?.("image");
      setNewMessage(file);
      handleSendMessage("image", file);
    }
  };

  const handleSendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        setTypeMessage?.("location");
        handleSendMessage("location", coords);
      });
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex gap-2 items-center">
        {/* Upload File */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Upload Image */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon className="w-5 h-5 text-gray-600" />
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Send Location */}
        <Button variant="ghost" size="icon" onClick={handleSendLocation}>
          <MapPin className="w-5 h-5 text-gray-600" />
        </Button>

        {/* Message Input */}
        <Input
          value={typeof newMessage === "string" ? newMessage : ""}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            lang === "ar" ? "اكتب رسالتك..." : "Type your message..."
          }
          className="flex-1"
          disabled={isLoading}
        />

        {/* Send Button */}
        <Button
          onClick={() => handleSendMessage("text", newMessage as string)}
          className="!h-11"
          disabled={
            isLoading ||
            !newMessage ||
            (typeof newMessage === "string" && !newMessage.trim())
          }
        >
          {isLoading ? (
            lang === "ar" ? (
              "..."
            ) : (
              "..."
            )
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
