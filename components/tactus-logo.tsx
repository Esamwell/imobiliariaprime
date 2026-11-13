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
  xs: { height: 28, width: 28, defaultClass: "h-7 w-auto" },
  sm: { height: 36, width: 36, defaultClass: "h-9 w-auto" },
  md: { height: 44, width: 44, defaultClass: "h-11 w-auto" },
  lg: { height: 56, width: 56, defaultClass: "h-14 w-auto" },
  xl: { height: 72, width: 72, defaultClass: "h-18 w-auto" },
  "2xl": { height: 96, width: 96, defaultClass: "h-24 w-auto" },
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
          width={pixelWidth * 2}
          height={pixelHeight * 2}
          priority={priority}
          className="h-full w-auto max-h-full object-contain drop-shadow-[0_0_14px_rgba(204,255,0,0.4)]"
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
          width={pixelWidth * 2}
          height={pixelHeight * 2}
          priority={priority}
          className="h-full w-auto max-h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
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
          width={pixelWidth * 2}
          height={pixelHeight * 2}
          priority={priority}
          className="h-full w-auto max-h-full object-contain"
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
        width={pixelWidth * 2}
        height={pixelHeight * 2}
        priority={priority}
        className="h-full w-auto max-h-full object-contain dark:hidden"
      />
      <Image
        src="/logos/tactus-verde.png"
        alt={alt}
        width={pixelWidth * 2}
        height={pixelHeight * 2}
        priority={priority}
        className="h-full w-auto max-h-full object-contain hidden dark:block drop-shadow-[0_0_14px_rgba(204,255,0,0.4)]"
      />
    </div>
  )
}
