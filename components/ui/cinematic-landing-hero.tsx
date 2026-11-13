"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  ShieldCheck, 
  MessageSquare,
  Lock
} from "lucide-react";
import { TactusLogo } from "@/components/tactus-logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 50px 50px;
      background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Apple Prime 3D Depth)
  ---------------------------------------------------------------------- */
  
  .text-3d-matte {
      color: #FFFFFF;
      text-shadow: 
          0 10px 30px rgba(0, 0, 0, 0.8), 
          0 2px 4px rgba(0, 0, 0, 0.6);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.8)) 
          drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  }

  .text-lime-matte {
      background: linear-gradient(180deg, #CCFF00 0%, #99E600 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 25px rgba(204, 255, 0, 0.35)) 
          drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #71717A 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.9)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.7));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #10162A 0%, #060911 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.95),
          0 20px 40px -20px rgba(0, 0, 0, 0.85),
          inset 0 1px 2px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(204, 255, 0, 0.08) 0%, transparent 45%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #0B0D14;
      box-shadow: 
          inset 0 0 0 2px #3F3F46, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.95),
          0 15px 25px -5px rgba(0,0,0,0.8);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.4),
          inset 0 1px 1px rgba(255,255,255,0.08),
          inset 0 -1px 1px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.06);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(16, 21, 35, 0.85) 0%, rgba(6, 9, 17, 0.9) 100%);
      backdrop-filter: blur(28px); 
      -webkit-backdrop-filter: blur(28px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.12),
          0 25px 50px -12px rgba(0, 0, 0, 0.9),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.6);
  }

  /* Physical Tactile Buttons */
  .btn-modern-lime {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      background: linear-gradient(180deg, #CCFF00 0%, #A8E600 100%);
      color: #07090E;
      box-shadow: 0 0 0 1px rgba(204,255,0,0.3), 0 2px 4px rgba(0,0,0,0.2), 0 12px 28px -4px rgba(204,255,0,0.35), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.1);
  }
  .btn-modern-lime:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(204,255,0,0.5), 0 6px 14px -2px rgba(0,0,0,0.3), 0 20px 36px -6px rgba(204,255,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.1);
  }
  .btn-modern-lime:active {
      transform: translateY(1px);
      background: #A8E600;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.2), inset 0 3px 6px rgba(0,0,0,0.2);
  }

  .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      background: linear-gradient(180deg, #27272A 0%, #141416 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #202024 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.2), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #141416;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  brandName = "TACTUS",
  tagline1 = "O CRM Definitivo para Corretores,",
  tagline2 = "e Imobiliárias de Alta Performance.",
  cardHeading = "Venda mais. Gerencie melhor. Escale sem limites.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Tactus CRM</span> conecta corretores autônomos 
      e imobiliárias diretamente aos seus clientes finais com vitrines públicas exclusivas, 
      Google Agenda integrada, funil Kanban no celular e gestão automatizada de aluguéis.
    </>
  ),
  metricValue = 4850000,
  metricLabel = "VGV Fechado (Mês)",
  ctaHeading = "Escale o faturamento da sua imobiliária.",
  ctaDescription = "Junte-se a mais de 2.300 corretores e gestores que aposentaram planilhas e portais caros para fechar mais negócios.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. Mouse Tracking 3D Parallax Lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 14,
            rotationX: -yVal * 14,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Cinematic Scroll Trigger Orchestration
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-track", { duration: 1.6, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.3, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.9");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.12, filter: "blur(18px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 70, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.2 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", { 
          width: isMobile ? "94vw" : "86vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#07090E] text-white font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* BACKGROUND LAYER 1: Cinematic Hero Text */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-extrabold text-[#CCFF00] backdrop-blur-md mb-4">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
          </span>
          ECOSSISTEMA IMOBILIÁRIO PRIME • VENDAS & LOCAÇÕES
        </div>

        <h1 className="text-track gsap-reveal text-3d-matte text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-lime-matte text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight">
          {tagline2}
        </h1>

        <p className="max-w-xl text-xs sm:text-sm text-white/50 mt-4 leading-relaxed font-medium">
          Role para baixo para explorar a tecnologia em ação ↓
        </p>
      </div>

      {/* BACKGROUND LAYER 2: Tactile Final CTA */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/30 text-[#CCFF00] text-[11px] font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          ATENDE CORRETORES, IMOBILIÁRIAS E CLIENTES
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight text-silver-matte max-w-4xl">
          {ctaHeading}
        </h2>
        <p className="text-white/60 text-sm md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/login"
            className="btn-modern-lime flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-sm group"
          >
            <span>Acessar o Tactus CRM</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#precos"
            className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm"
          >
            <span>Ver Planos para Corretores</span>
          </Link>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Luxury Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[94vw] md:w-[86vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[44px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex flex-col items-center lg:items-end justify-center z-20 w-full">
              <div className="flex items-center gap-3">
                <TactusLogo variant="verde" size="lg" className="h-12 w-12" />
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-card-silver-matte">
                  {brandName}<span className="text-[#CCFF00]">.</span>
                </h2>
              </div>
              <span className="text-xs text-[#CCFF00] font-black uppercase tracking-widest mt-1">
                Portal & CRM Imobiliário
              </span>
            </div>

            {/* 2. CENTER: IPHONE 16 PRO WITH REAL TACTUS APP UI */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.70] md:scale-90 lg:scale-100">
                
                {/* iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[285px] h-[590px] rounded-[3.2rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#07090E] rounded-[2.6rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[98px] h-[26px] bg-black rounded-full z-50 flex items-center justify-between px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.8)] animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>

                    {/* Real Tactus Mobile UI */}
                    <div className="relative w-full h-full pt-10 px-4 pb-6 flex flex-col justify-between">
                      
                      {/* Top App Header */}
                      <div className="phone-widget flex justify-between items-center mb-2 pt-2">
                        <div className="flex items-center gap-2">
                          <TactusLogo variant="verde" size="xs" className="h-6 w-6" />
                          <span className="text-xs font-black tracking-tight text-white">Tactus CRM</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center font-bold text-[10px] border border-[#CCFF00]/30">
                          CS
                        </div>
                      </div>

                      {/* VGV Meter */}
                      <div className="phone-widget relative w-36 h-36 mx-auto flex items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="72" cy="72" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                          <circle className="progress-ring" cx="72" cy="72" r="54" fill="none" stroke="#CCFF00" strokeWidth="10" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="text-lg font-black tracking-tighter text-white">R$ 4.85M</span>
                          <span className="text-[8px] text-[#CCFF00] uppercase tracking-[0.1em] font-extrabold mt-0.5">
                            {metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Live Agenda and Lead Cards */}
                      <div className="space-y-2 pt-1">
                        <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-2.5 border border-blue-400/30 text-blue-400">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-white truncate">10:00 • Mansão Alphaville</div>
                            <div className="text-[8px] text-white/50">Google Agenda Sincronizada</div>
                          </div>
                        </div>

                        <div className="phone-widget widget-depth rounded-xl p-2.5 flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-[#CCFF00]/20 flex items-center justify-center mr-2.5 border border-[#CCFF00]/40 text-[#CCFF00]">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-white truncate">Lead Quente • Renata</div>
                            <div className="text-[8px] text-white/50">Proposta Aberta (WhatsApp)</div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Safe Indicator */}
                      <div className="w-[100px] h-[3px] bg-white/20 rounded-full mx-auto" />
                    </div>

                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-20px] lg:left-[-90px] floating-ui-badge rounded-2xl p-3.5 items-center gap-3.5 z-30">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-inner">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <p className="text-white text-xs font-black tracking-tight">Google Agenda</p>
                    </div>
                    <p className="text-white/50 text-[10px] font-medium">1-Clique nativo celular</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-16 right-[-20px] lg:right-[-90px] floating-ui-badge rounded-2xl p-3.5 items-center gap-3.5 z-30">
                  <div className="w-9 h-9 rounded-xl bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00] shadow-inner">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-black tracking-tight">Vitrine Pública</p>
                    <p className="text-[#CCFF00] text-[10px] font-mono font-bold">tactus.com.br/v/tactus</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): HEADINGS */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-2 lg:mb-4 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
