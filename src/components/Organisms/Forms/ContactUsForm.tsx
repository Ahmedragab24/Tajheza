"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactUsFormSchema } from "@/schemas/ContactUsFormSchema";
import { Form, FormField } from "@/components/ui/form";
import { toast } from "sonner";
import CustomFormItem from "@/components/Molecules/FormItems/CustomFromItem";
import CustomPhoneInput from "@/components/Molecules/FormItems/CustomPhoneInput";
import SubmitBtn from "@/components/Atoms/buttons/SubmitBtn";
import { useContactUsMutation } from "@/store/services/AppInfo";
import { SendMessageType } from "@/types/AppInfo";
import { ErrorType } from "@/types/Errors";
import { LangType } from "@/types/globals";

interface Props {
  lang: LangType;
}

const ContactUsForm = ({ lang }: Props) => {
  const [ContactUs, { isLoading }] = useContactUsMutation();

  const form = useForm<z.infer<typeof ContactUsFormSchema>>({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      name: "",
      phone: {
        iso_code: "",
        number: "",
      },
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ContactUsFormSchema>) {
    const Data: SendMessageType = {
      name: values.name,
      phone: values.phone.iso_code + values.phone.number,
      message: values.message,
    };

    try {
      await ContactUs(Data).unwrap();
      toast.success(
        lang === "ar"
          ? "تم إرسال الرسالة بنجاح ✅"
          : "Message sent successfully ✅"
      );
      form.reset();
    } catch (error: unknown) {
      const err = error as ErrorType;
      const firstError =
        err?.data?.message ||
        (lang === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة 😞"
          : "An error occurred while sending the message 😞");
      toast.error(firstError);
    }
  }

  return (
    <div className="w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Form {...form}>
        <div className="max-w-2xl mx-auto space-y-4 bg-muted p-4 md:p-6 rounded-xl shadow-md">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={lang === "ar" ? "الاسم الكامل" : "Full Name"}
                    placeholder={
                      lang === "ar"
                        ? "أدخل الاسم بالكامل"
                        : "Enter your full name"
                    }
                    type="text"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <CustomPhoneInput
                    field={field}
                    label={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <CustomFormItem
                    field={field}
                    label={lang === "ar" ? "الرسالة" : "Message"}
                    placeholder={
                      lang === "ar"
                        ? "اكتب رسالتك هنا"
                        : "Write your message here"
                    }
                    type="text"
                    typeInput="textarea"
                    className="!h-[150px]"
                  />
                )}
              />
            </div>

            <SubmitBtn
              title={lang === "ar" ? "إرسال" : "Send"}
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
            />
          </form>
        </div>
      </Form>
    </div>
  );
};

export default ContactUsForm;
