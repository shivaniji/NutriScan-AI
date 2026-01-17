import React from 'react';
import { 
  Search, 
  Flame, 
  Beef, 
  Wheat, 
  Droplet, 
  Leaf, 
  Candy, 
  Info,
  Utensils,
  Loader2,
  AlertCircle
} from 'lucide-react';

export const SearchIcon = ({ className }: { className?: string }) => <Search className={className} />;
export const FlameIcon = ({ className }: { className?: string }) => <Flame className={className} />;
export const ProteinIcon = ({ className }: { className?: string }) => <Beef className={className} />;
export const CarbsIcon = ({ className }: { className?: string }) => <Wheat className={className} />;
export const FatIcon = ({ className }: { className?: string }) => <Droplet className={className} />;
export const FiberIcon = ({ className }: { className?: string }) => <Leaf className={className} />;
export const SugarIcon = ({ className }: { className?: string }) => <Candy className={className} />;
export const InfoIcon = ({ className }: { className?: string }) => <Info className={className} />;
export const UtensilsIcon = ({ className }: { className?: string }) => <Utensils className={className} />;
export const SpinnerIcon = ({ className }: { className?: string }) => <Loader2 className={className} />;
export const AlertIcon = ({ className }: { className?: string }) => <AlertCircle className={className} />;