"use client";

import { useState, useEffect } from "react";
import { WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <a
        href={`${WA_LINK}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pulse relative flex items-center gap-3 bg-[#25d366] text-white rounded-full shadow-2xl px-5 py-3.5 font-semibold text-sm hover:scale-105 transition-transform group"
        aria-label="Contactar por WhatsApp para presupuesto gratuito"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Presupuesto gratis
        </span>
      </a>
    </div>
  );
}
