import { MapPin, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  name: string;
  college: string;
  avatar: string;
  service: string;
  price: number;
  onViewProfile?: () => void;
}

const ServiceCard = ({ name, college, avatar, service, price, onViewProfile }: ServiceCardProps) => (
  <div className="rounded-xl bg-card p-4 card-shadow animate-fade-in">
    <div className="flex items-start gap-3">
      <img src={avatar} alt={name} className="h-11 w-11 rounded-full object-cover bg-muted" />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground truncate">{name}</h3>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={12} /> {college}
        </p>
      </div>
      <div className="flex items-center gap-0.5 rounded-lg bg-primary-soft px-2.5 py-1">
        <IndianRupee size={13} className="text-primary" />
        <span className="text-sm font-bold text-primary">{price}</span>
      </div>
    </div>
    <div className="mt-3">
      <span className="inline-block rounded-lg bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
        {service}
      </span>
    </div>
    <Button
      variant="outline"
      size="sm"
      className="mt-3 w-full rounded-lg text-xs font-semibold"
      onClick={onViewProfile}
    >
      View Profile
    </Button>
  </div>
);

export default ServiceCard;
