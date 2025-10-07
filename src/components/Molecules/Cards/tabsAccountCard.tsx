"use client";

import { Card } from "@/components/ui/card";
import {
  BanknoteArrowUp,
  Package,
  Route,
  TicketCheck,
  Trash2,
  User,
} from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { ProfileType } from "@/types/Auth/Profile";
import { Tabs } from "@/app/[locale]/client/home/profile/page";

interface TabsType {
  value: string;
  nameKey: string;
  icon: React.ElementType;
}

const tabs: TabsType[] = [
  {
    value: "account",
    nameKey: "accountInfo",
    icon: User,
  },
  {
    value: "orders",
    nameKey: "orders",
    icon: Package,
  },
  {
    value: "My-points",
    nameKey: "myPoints",
    icon: Route,
  },
  {
    value: "My-Reservations",
    nameKey: "myReservations",
    icon: TicketCheck,
  },
  {
    value: "transactions",
    nameKey: "transactions",
    icon: BanknoteArrowUp,
  },
  {
    value: "deleteAccount",
    nameKey: "deleteAccount",
    icon: Trash2,
  },
];

interface Props {
  userData: ProfileType | undefined;
  activeTab: string;
  setActiveTab: (tab: Tabs) => void;
}

const TabsAccountCard = ({ activeTab, setActiveTab, userData }: Props) => {
  const t = useTranslations("TabsAccountCard");

  return (
    <Card className="bg-white shadow-2xl rounded-3xl py-6">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold">{userData?.name}</h3>
          <h5 className="text-md text-gray-400">{userData?.email}</h5>
          <span className="text-sm text-gray-400 font-semibold">
            {userData?.phone}
          </span>
        </div>

        <nav className="space-y-2">
          {tabs.map(({ icon, nameKey, value }) => (
            <div
              key={value}
              className={`w-full justify-start duration-200 text-md flex items-center gap-1 px-4 py-2 cursor-pointer hover:bg-gray-200
                ${
                  activeTab === value &&
                  "bg-gray-200 text-primary font-medium border-e-4 border-secondary"
                }
                ${value === "deleteAccount" ? "text-red-800" : ""}`}
              onClick={() => setActiveTab(value as Tabs)}
            >
              {icon && React.createElement(icon, { className: "mx-2 h-4 w-4" })}
              <span>{t(nameKey)}</span>
            </div>
          ))}
        </nav>
      </div>
    </Card>
  );
};

export default TabsAccountCard;
