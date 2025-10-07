import { ServiceType } from "@/types/Companies";
import { LangType } from "@/types/globals";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Props {
  service: ServiceType;
  lang: LangType;
}

const ServiceCompanyCard = ({ lang, service }: Props) => {
  return (
    <Card
      key={service.id}
      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 gap-2 p-0"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
            service.image ||
            "/placeholder.svg?height=300&width=400&query=professional+service"
          }
          alt={service.name}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
          {service.products?.length || 0} {lang === "ar" ? "منتج" : "Product"}
        </Badge>
      </div>
      <div className="px-6 py-2">
        <h3 className="text-xl text-start font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
          <span>{lang === "ar" ? "مشاهدة المنتجات" : "View Products"}</span>
          {lang === "ar" ? (
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          ) : (
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          )}
        </div>
      </div>
    </Card>
  );
};

export default ServiceCompanyCard;
