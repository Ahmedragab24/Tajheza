"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { OrderUserType } from "@/types/Companies";
import { LangType } from "@/types/globals";
import { motion } from "framer-motion";

interface CompanyCustomersProps {
  customers: OrderUserType[];
  lang: LangType;
}

export function CompanyCustomers({ customers, lang }: CompanyCustomersProps) {
  const displayCustomers = customers.slice(0, 12);

  const t = {
    title:
      lang === "ar" ? "يثق بنا عملاء مميزون" : "Trusted by Amazing Customers",
    subtitle:
      lang === "ar"
        ? "انضم إلى مئات العملاء الراضين الذين جربوا خدمتنا المتميزة"
        : "Join hundreds of satisfied customers who have experienced our exceptional service",
    more: lang === "ar" ? "عميل آخر سعيد" : "more happy customers",
  };

  return (
    <section className="py-10 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            {t.title}
          </h2>

          <Card className="bg-secondary/30 p-10 border border-border/50 shadow-xl rounded-3xl backdrop-blur">
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {displayCustomers.map((customer) => (
                <motion.div
                  key={customer.id}
                  className="flex flex-col items-center gap-3 group cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    show: { opacity: 1, scale: 1, y: 0 },
                  }}
                >
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-muted group-hover:border-primary transition-all duration-300 shadow-md">
                      <AvatarImage src={customer.image || undefined} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground text-xl">
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* تأثير حول الصورة عند المرور */}
                    <div className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/40 transition-all duration-500" />
                  </div>

                  <p className="text-sm font-medium text-foreground text-center max-w-[100px] truncate">
                    {customer.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {customers.length > 12 && (
              <div className="mt-10 text-center text-muted-foreground">
                {lang === "ar" ? (
                  <>
                    والمزيد من{" "}
                    <span className="font-bold text-foreground">
                      {customers.length - 12}+{" "}
                    </span>
                    {t.more}
                  </>
                ) : (
                  <>
                    And{" "}
                    <span className="font-bold text-foreground">
                      {customers.length - 12}+{" "}
                    </span>
                    {t.more}
                  </>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
