import React from "react";
import { cn } from "@/lib/utils";

interface CardPremiumProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ElementType;
}

export function CardPremium({ 
  children, 
  title, 
  subtitle, 
  icon: Icon,
  className,
  ...props 
}: CardPremiumProps) {
  return (
    <div 
      className={cn(
        "bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    >
      {(title || subtitle || Icon) && (
        <div className="px-8 pt-8 flex items-start justify-between">
          <div>
            {subtitle && <p className="text-[10px] text-slate-400 uppercase font-black tracking-[3px] mb-1">{subtitle}</p>}
            {title && <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h3>}
          </div>
          {Icon && (
            <div className="p-2 rounded-xl bg-slate-50 text-slate-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
