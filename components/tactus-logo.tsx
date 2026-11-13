"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export type TactusLogoVariant = "auto" | "verde" | "branco" | "azul"

export interface TactusLogoProps {
  variant?: TactusLogoVariant
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  width?: number
  height?: number
  className?: string
  priority?: boolean
  alt?: string
}

const SIZE_MAP = {
  xs: { height: 36, width: 36, defaultClass: "h-9 w-auto" },
  sm: { height: 48, width: 48, defaultClass: "h-12 w-auto" },
  md: { height: 60, width: 60, defaultClass: "h-15 w-auto" },
  lg: { height: 80, width: 80, defaultClass: "h-20 w-auto" },
  xl: { height: 104, width: 104, defaultClass: "h-26 w-auto" },
  "2xl": { height: 136, width: 136, defaultClass: "h-34 w-auto" },
}

export function TactusLogo({
  variant = "auto",
  size = "md",
  width,
  height,
  className,
  priority = false,
  alt = "Tactus CRM",
}: TactusLogoProps) {
  const pixelHeight = height || SIZE_MAP[size].height
  const pixelWidth = width || SIZE_MAP[size].width
  const baseClass = SIZE_MAP[size].defaultClass

  if (variant === "verde") {
    return (
      <div className={cn("relative flex items-center justify-center shrink-0 transition-transform duration-200", baseClass, className)}>
        <Image
          src="/logos/tactus-verde.png"
          alt={alt}
          width={pixelWidth * 3}
          height={pixelHeight * 3}
          priority={priority}
          className="h-full w-auto max-h-full object-contain drop-shadow-[0_0_18px_rgba(204,255,0,0.5)]"
        />
      </div>
    )
  }

  if (variant === "branco") {
    return (
      <div className={cn("relative flex items-center justify-center shrink-0 transition-transform duration-200", baseClass, className)}>
        <Image
          src="/logos/tactus-branco.png"
          alt={alt}
          width={pixelWidth * 3}
          height={pixelHeight * 3}
          priority={priority}
          className="h-full w-auto max-h-full object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.3)]"
        />
      </div>
    )
  }

  if (variant === "azul") {
    return (
      <div className={cn("relative flex items-center justify-center shrink-0 transition-transform duration-200", baseClass, className)}>
        <Image
          src="/logos/tactus-azul.png"
          alt={alt}
          width={pixelWidth * 3}
          height={pixelHeight * 3}
          priority={priority}
          className="h-full w-auto max-h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        />
      </div>
    )
  }

  // "auto": Tactus Azul no tema claro e Tactus Verde no tema escuro
  return (
    <div className={cn("relative flex items-center justify-center shrink-0 transition-transform duration-200", baseClass, className)}>
      <Image
        src="/logos/tactus-azul.png"
        alt={alt}
        width={pixelWidth * 3}
        height={pixelHeight * 3}
        priority={priority}
        className="h-full w-auto max-h-full object-contain dark:hidden drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      />
      <Image
        src="/logos/tactus-verde.png"
        alt={alt}
        width={pixelWidth * 3}
        height={pixelHeight * 3}
        priority={priority}
        className="h-full w-auto max-h-full object-contain hidden dark:block drop-shadow-[0_0_18px_rgba(204,255,0,0.5)]"
      />
    </div>
  )
}
