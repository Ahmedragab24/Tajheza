"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import LoaderSpan from "@/components/Atoms/Loaders/LoaderSpan";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import TabsAccountCard from "@/components/Molecules/Cards/tabsAccountCard";
import ProfileForm from "@/components/Organisms/Forms/Auth/profileForm";
import DeleteAccount from "@/components/Sections/Client/Profile/DeleteAccount";
import { useLocale } from "next-intl";

export type Tabs = "account" | "orders" | "deleteAccount";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tabs>("account");
  const { data, isLoading } = useGetUserInfoQuery();
  const lang = useLocale();

  const handleTabChange = (value: string) => {
    setActiveTab(value as Tabs);
  };

  if (isLoading) {
    return <LoaderSpan />;
  }

  return (
    <div className="Container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10">
        {/* Sidebar - 1/4 width on desktop */}
        <div className="lg:col-span-3">
          <TabsAccountCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userData={data?.data?.user}
          />
        </div>

        {/* Main Content Area - 3/4 width on desktop */}
        <div className="lg:col-span-9">
          <Card className="bg-white shadow-2xl rounded-3xl px-8">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsContent
                value="account"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <ProfileForm userData={data?.data?.user} />
              </TabsContent>

              {/* <TabsContent value="orders" className="mt-6">
                <OrdersTable />
              </TabsContent> */}

              <TabsContent
                value="deleteAccount"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <DeleteAccount />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
