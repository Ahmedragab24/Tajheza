"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import LoaderSpan from "@/components/Atoms/Loaders/LoaderSpan";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import TabsAccountCard from "@/components/Molecules/Cards/tabsAccountCard";
import ProfileForm from "@/components/Organisms/Forms/Auth/profileForm";
import DeleteAccount from "@/components/Sections/Client/Profile/DeleteAccount";
import { useLocale } from "next-intl";
import ChangePasswordForm from "@/components/Organisms/Forms/ChangePasswordForm";
import { LangType } from "@/types/globals";
import AddressSection from "@/components/Sections/Client/Profile/AddressSection";
import FavoritesSection from "@/components/Sections/Client/Profile/FavoritesSection";
import OrdersSection from "@/components/Sections/Client/Profile/OrdersSection";
import ContactUsForm from "@/components/Organisms/Forms/ContactUsForm";
import MembershipSection from "@/components/Sections/Client/Profile/MembershipSection";
import NotificationsSection from "@/components/Sections/Client/Profile/NotificationsSection";
import ConversationsSection from "@/components/Sections/Client/Profile/ConversationsSection";
import {
  BellRing,
  Gem,
  Headset,
  HeartPlus,
  Lock,
  MapPinHouse,
  MessagesSquare,
  TicketCheck,
  Trash2,
  User,
} from "lucide-react";

export type TabsValueType =
  | "account"
  | "change_password"
  | "notifications"
  | "conversations"
  | "address"
  | "favorites"
  | "reservations"
  | "membership"
  | "customer_service"
  | "deleteAccount";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabsValueType>("account");
  const { data, isLoading } = useGetUserInfoQuery();
  const lang = useLocale() as LangType;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "") as TabsValueType;
      if (hash) setActiveTab(hash);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabsValueType);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpan />
      </div>
    );
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
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar"
                        ? "المعلومات الشخصية"
                        : "Personal information"}
                    </h2>
                    <User />
                  </div>
                  <ProfileForm userData={data?.data?.user} />
                </div>
              </TabsContent>

              <TabsContent
                value="change_password"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar"
                        ? "تغيير كلمة المرور الحالية"
                        : "Change your current password"}
                    </h2>
                    <Lock />
                  </div>

                  <ChangePasswordForm lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="address"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar"
                        ? "العناوين المسجلة"
                        : "Registered addresses"}
                    </h2>
                    <MapPinHouse />
                  </div>

                  <AddressSection lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="favorites"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "المفضلة" : "Favorites"}
                    </h2>
                    <HeartPlus />
                  </div>

                  <FavoritesSection lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="reservations"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "الحجوزات" : "Reservations"}
                    </h2>
                    <TicketCheck />
                  </div>

                  <OrdersSection lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="notifications"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
                id="notifications"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "الإشعارات" : "Notifications"}
                    </h2>
                    <BellRing />
                  </div>
                  <NotificationsSection lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="conversations"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
                id="notifications"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "المحادثات" : "Conversations"}
                    </h2>
                    <MessagesSquare />
                  </div>
                  <ConversationsSection lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="membership"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "العضوية" : "Membership"}
                    </h2>
                    <Gem />
                  </div>
                  <MembershipSection lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="customer_service"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "خدمة العملاء" : "Membership"}
                    </h2>
                    <Headset />
                  </div>
                  <ContactUsForm lang={lang} />
                </div>
              </TabsContent>

              <TabsContent
                value="deleteAccount"
                className="mt-6"
                dir={lang === "ar" ? "rtl" : "lrt"}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-center text-primary">
                    <h2 className="text-lg md:text-2xl font-semibold">
                      {lang === "ar" ? "حذف الحساب" : "Delete Account"}
                    </h2>
                    <Trash2 />
                  </div>
                  <DeleteAccount />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
