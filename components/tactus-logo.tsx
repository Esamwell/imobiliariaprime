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
  xs: { px: 24, boxClass: "h-6 w-6" },
  sm: { px: 32, boxClass: "h-8 w-8" },
  md: { px: 40, boxClass: "h-10 w-10" },
  lg: { px: 52, boxClass: "h-13 w-13" },
  xl: { px: 68, boxClass: "h-17 w-17" },
  "2xl": { px: 96, boxClass: "h-24 w-24" },
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
  const pixelSize = width || height || SIZE_MAP[size].px
  const boxClass = SIZE_MAP[size].boxClass

  if (variant === "verde") {
    return (
      <div className={cn("relative flex items-center justify-center shrink-0", boxClass, className)}>
        <Image
          src="/logos/tactus-verde.png"
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          priority={priority}
          className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(204,255,0,0.35)]"
        />
      </div>
    )
  }

  if (variant === "branco") {
    return (
      <div className={cn("relative flex items-center justify-center shrink-0", boxClass, className)}>
        <Image
          src="/logos/tactus-branco.png"
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          priority={priority}
          className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
        />
      </div>
    )
  }

  if (variant === "azul") {
    return (
      <div className={cn("relative flex items-center justify-center shrink-0", boxClass, className)}>
        <Image
          src="/logos/tactus-azul.png"
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          priority={priority}
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  // "auto": Tactus Azul no tema claro e Tactus Verde no tema escuro
  return (
    <div className={cn("relative flex items-center justify-center shrink-0", boxClass, className)}>
      <Image
        src="/logos/tactus-azul.png"
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        priority={priority}
        className="h-full w-full object-contain dark:hidden"
      />
      <Image
        src="/logos/tactus-verde.png"
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        priority={priority}
        className="h-full w-full object-contain hidden dark:block drop-shadow-[0_0_10px_rgba(204,255,0,0.35)]"
      />
    </div>
  )
}
