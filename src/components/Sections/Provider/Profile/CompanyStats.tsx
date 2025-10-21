// "use client";

// import { Star, Users, Briefcase, Award } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { CompanyDetailsType } from "@/types/Companies";
// import { LangType } from "@/types/globals";
// import { useGetCompanyServicesQuery } from "@/store/services/Provider/Company";

// interface CompanyStatsProps {
//   lang: LangType;
// }

// export function CompanyStats({ lang }: CompanyStatsProps) {
//   const { data } = useGetCompanyServicesQuery();
//   const Services = data?.data;

//   const stats = [
//     {
//       icon: Star,
//       label: lang === "ar" ? "متوسط ​​التقييم" : "Average Rating",
//       value: company.rating.toFixed(1),
//       suffix: "/ 5.0",
//       color: "text-yellow-600",
//       bgColor: "bg-yellow-50",
//     },
//     {
//       icon: Users,
//       label: lang === "ar" ? "إجمالي المراجعات" : "Total Reviews",
//       value: company.reviews_count.toString(),
//       suffix: "reviews",
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       icon: Briefcase,
//       label: lang === "ar" ? "الخدمات المقدمة" : "Services Offered",
//       value: company.services?.length.toString() || "0",
//       suffix: "services",
//       color: "text-purple-600",
//       bgColor: "bg-purple-50",
//     },
//     {
//       icon: Award,
//       label: lang === "ar" ? "العملاء السعداء" : "Happy Customers",
//       value: company.ordered_users?.length.toString() || "0",
//       suffix: "customers",
//       color: "text-green-600",
//       bgColor: "bg-green-50",
//     },
//   ];

//   return (
//     <section className="py-10 -mt-16 relative z-20">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {stats.map((stat, index) => (
//             <Card
//               key={index}
//               className="p-6 hover:shadow-xl transition-shadow duration-300 border-2"
//             >
//               <div className="flex items-start gap-4">
//                 <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
//                   <stat.icon className="h-6 w-6" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm text-muted-foreground font-medium mb-1">
//                     {stat.label}
//                   </p>
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-3xl font-bold text-foreground">
//                       {stat.value}
//                     </span>
//                     <span className="text-sm text-muted-foreground">
//                       {stat.suffix}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
