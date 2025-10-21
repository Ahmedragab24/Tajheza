"use client";

import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useGetSocialLinksQuery } from "@/store/services/AppInfo";
import { SocialType } from "@/types/AppInfo";

const SocialIconsGroup = () => {
  const { data } = useGetSocialLinksQuery();
  const socials: SocialType[] = data?.data?.items || [];

  const renderIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF />;
      case "instagram":
        return <FaInstagram />;
      case "pinterest":
        return <FaPinterestP />;
      case "youtube":
        return <FaYoutube />;
      case "tiktok":
        return <FaTiktok />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "twitter":
        return <FaTwitter />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center gap-6 mt-2">
      {socials.length > 0 ? (
        socials.map((item, index) => {
          const Icon = renderIcon(item.platform);
          if (!Icon) return null;

          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.platform}
              className="text-xl text-secondary hover:text-[#8c5b5a] transition-colors"
            >
              {Icon}
            </a>
          );
        })
      ) : (
        <p className="text-sm text-gray-400">No social links available</p>
      )}
    </div>
  );
};

export default SocialIconsGroup;
