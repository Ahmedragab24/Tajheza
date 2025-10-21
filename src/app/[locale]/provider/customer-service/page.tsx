import ContactUsForm from "@/components/Organisms/Forms/ContactUsForm";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import React from "react";

const CustomerServicePage = () => {
  const lang = useLocale() as LangType;

  return (
    <div className="Container h-[80vh] flex justify-center items-center">
      <div className="md:w-2xl space-y-6 border p-4 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl text-primary font-semibold">
            {lang === "ar" ? "تواصل معنا" : "Contact us"}
          </h1>
          <p className="text-sm text-gray-500 max-w-md text-center">
            {lang === "ar"
              ? "يسعدنا مساعدتك في أي استفسار أو مشكلة تواجهك. املأ النموذج أدناه وسنقوم بالرد في أقرب وقت."
              : "We are happy to assist you with any questions or concerns you may have. Fill out the form below and we will respond as soon as possible."}
          </p>
        </div>
        <ContactUsForm lang={lang} />
      </div>
    </div>
  );
};

export default CustomerServicePage;
