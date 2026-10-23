import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  experience,
  profile,
  projects,
  skillGroups,
  type Project,
} from "./data";

type IconName =
  | "arrow"
  | "download"
  | "github"
  | "linkedin"
  | "mail"
  | "close"
  | "menu"
  | "chevron"
  | "sun"
  | "moon"
  | "motion"
  | "motionOff";

function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" />,
    github: (
      <path
        d="M9 20c-4 1-4-2-6-2m12 4v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.7 5.7 0 0 0-1.6-4 5.3 5.3 0 0 0-.1-4S17.8-.4 15 1.5a13.5 13.5 0 0 0-6 0C6.2-.4 4.9 0 4.9 0a5.3 5.3 0 0 0-.1 4 5.7 5.7 0 0 0-1.6 4c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 9 18v4"
        transform="translate(1 1) scale(.9)"
      />
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z" />,
    motion: <path d="M12 3q1.2 7.8 9 9-7.8 1.2-9 9-1.2-7.8-9-9 7.8-1.2 9-9Z" />,
    motionOff: (
      <>
        <path d="M12 3q1.2 7.8 9 9-7.8 1.2-9 9-1.2-7.8-9-9 7.8-1.2 9-9Z" opacity=".45" />
        <path d="m4 4 16 16" />
      </>
    ),
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Seal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={`seal ${className}`}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="9" strokeLinejoin="round">
        <circle cx="100" cy="100" r="80" />
        <path d="M40 100q60-60 120 0-60 60-120 0Z" />
        <circle cx="100" cy="100" r="20" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function ArtifactSymbol({
  kind,
  className = "",
}: {
  kind: Project["icon"];
  className?: string;
}) {
  const symbols: Record<Project["icon"], ReactNode> = {
    orbit: (
      <>
        <ellipse cx="60" cy="60" rx="46" ry="18" transform="rotate(-35 60 60)" />
        <ellipse cx="60" cy="60" rx="46" ry="18" transform="rotate(35 60 60)" />
        <circle cx="60" cy="60" r="9" fill="currentColor" />
      </>
    ),
    diamond: (
      <>
        <path d="m60 14 38 46-38 46-38-46Z" />
        <path d="m60 40 16 20-16 20-16-20Z" fill="currentColor" />
      </>
    ),
    world: (
      <>
        <circle cx="60" cy="60" r="42" />
        <ellipse cx="60" cy="60" rx="18" ry="42" />
        <path d="M18 60h84" />
      </>
    ),
    leaf: (
      <>
        <path d="M34 86c-10-36 10-56 50-54 2 38-12 60-50 54Z" />
        <path d="M32 90 76 40" />
      </>
    ),
    hex: (
      <>
        <path d="m60 14 40 23v46l-40 23-40-23V37Z" />
        <path d="m60 42 16 9v18l-16 9-16-9V51Z" fill="currentColor" />
      </>
    ),
    star: (
      <path d="M60 12q6 42 48 48-42 6-48 48-6-42-48-48 42-6 48-48Z" />
    ),
    grid: (
      <>
        <rect x="22" y="26" width="76" height="68" rx="14" />
        <path d="M36 46h34M48 60h34M36 74h20" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 120 120"
      className={`artifact-symbol ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {symbols[kind]}
    </svg>
  );
}

type Building = [x: number, width: number, height: number, top?: "spire" | "dome" | "roof" | "clock"];

const farTown: Building[] = [
  [0, 70, 70], [70, 46, 96, "spire"], [116, 92, 64], [208, 58, 88, "dome"],
  [266, 84, 76], [350, 42, 118, "spire"], [392, 98, 86], [490, 70, 116, "dome"],
  [560, 50, 150, "spire"], [610, 110, 112], [720, 60, 176, "spire"], [780, 92, 132],
  [872, 52, 196, "spire"], [924, 100, 146, "dome"], [1024, 60, 172, "spire"], [1084, 116, 124],
];

const nearTown: Building[] = [
  [-10, 120, 42], [110, 74, 58, "roof"], [184, 118, 38], [302, 62, 72, "roof"],
  [364, 128, 48], [492, 82, 84, "roof"], [574, 44, 126, "clock"], [618, 116, 70],
  [734, 92, 100, "roof"], [826, 128, 82], [954, 72, 120, "roof"], [1026, 46, 168, "clock"],
  [1072, 140, 96, "roof"],
];

const sparkles: [x: number, y: number, size: number][] = [
  [90, 70, 9], [250, 150, 6], [420, 60, 7], [560, 120, 11], [640, 40, 6],
  [1120, 90, 10], [1060, 300, 6], [700, 260, 7], [180, 280, 5], [1160, 210, 6],
];

function buildingShape([x, w, h, top]: Building, base: number) {
  const y = base - h;
  const mid = x + w / 2;
  const shapes = [<rect key="body" x={x} y={y} width={w} height={h + 1} />];
  if (top === "spire" || top === "clock")
    shapes.push(<path key="top" d={`M${x + w * 0.2} ${y + 1} L${mid} ${y - h * 0.45} L${x + w * 0.8} ${y + 1}Z`} />);
  if (top === "roof")
    shapes.push(<path key="top" d={`M${x - 4} ${y + 1} L${mid} ${y - w * 0.42} L${x + w + 4} ${y + 1}Z`} />);
  if (top === "dome")
    shapes.push(<path key="top" d={`M${x + w * 0.15} ${y + 1} A${w * 0.35} ${w * 0.35} 0 0 1 ${x + w * 0.85} ${y + 1}Z`} />);
  return shapes;
}

const cloudPuffs: [x: number, y: number, r: number][] = [
  [30, -18, 26], [78, -34, 38], [132, -26, 32], [180, -40, 40], [228, -20, 26],
];

function spiral(cx: number, cy: number, a: number) {
  return `M${cx} ${cy}A${a} ${a} 0 0 1 ${cx + 2 * a} ${cy}A${2 * a} ${2 * a} 0 0 1 ${cx - 2 * a} ${cy}A${3 * a} ${3 * a} 0 0 1 ${cx + 4 * a} ${cy}`;
}

function SwirlCloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="-22" width="258" height="22" rx="11" className="cloud-body" />
      {cloudPuffs.map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} className="cloud-body" />
      ))}
      <path d={spiral(72, -34, 6)} className="cloud-line" />
      <path d={spiral(174, -40, 7)} className="cloud-line" />
    </g>
  );
}

function CloudStrip({ className, clouds }: { className: string; clouds: [x: number, y: number, scale: number][] }) {
  return (
    <svg className={`cloud-strip ${className}`} viewBox="0 0 2400 120" aria-hidden="true">
      {[0, 1200].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          {clouds.map(([x, y, s]) => <SwirlCloud key={x} x={x} y={y} scale={s} />)}
        </g>
      ))}
    </svg>
  );
}

function MiniCard({ className, rotate }: { className: string; rotate: number }) {
  return (
    <svg className={`mini-card ${className}`} viewBox="-34 -50 68 100" aria-hidden="true">
      <g transform={`rotate(${rotate})`}>
        <rect x="-26" y="-42" width="52" height="84" rx="8" className="mini-card-face" />
        <rect x="-20" y="-36" width="40" height="72" rx="5" className="mini-card-frame" />
        <path d="M-13 0Q0-12 13 0Q0 12-13 0Z" className="mini-card-frame" />
        <circle r="4" className="mini-card-pupil" />
      </g>
    </svg>
  );
}

const eyeDrips: [x: number, top: number, bottom: number][] = [
  [-215, 30, 78], [-120, 72, 128], [205, 36, 84], [248, 10, 52],
];

function SkyEye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const fade = fadeRef.current;
    const stage = eye?.parentElement;
    if (!eye || !fade || !stage) return;
    const relocate = (event: AnimationEvent) => {
      if (event.target !== fade) return;
      const centerX = stage.clientWidth * (0.1 + Math.random() * 0.8);
      const centerY = stage.clientHeight * (0.1 + Math.random() * 0.5);
      const scale = 0.65 + Math.random() * 0.45;
      const x = centerX - eye.offsetWidth / 2 - eye.offsetLeft;
      const y = centerY - eye.offsetHeight * 0.465 - eye.offsetTop;
      eye.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale.toFixed(2)})`;
    };
    fade.addEventListener("animationiteration", relocate);
    return () => fade.removeEventListener("animationiteration", relocate);
  }, []);

  return (
    <div className="sky-eye" ref={eyeRef} aria-hidden="true">
      <div className="sky-eye-fade" ref={fadeRef}>
        <div className="sky-eye-bob">
          <svg className="eye-defs" width="0" height="0">
            <clipPath id="eye-socket-clip" clipPathUnits="objectBoundingBox">
              <path d="M0 .5Q.5-.5 1 .5Q.5 1.5 0 .5Z" />
            </clipPath>
          </svg>
          <svg className="eye-frame" viewBox="-280 -270 560 580">
            <path d="M-270 0Q0-200 270 0Q0 200-270 0ZM-215 0Q0 130 215 0Q0-130-215 0Z" />
            <path d="M-205-40Q-188-120-160-178Q-140-112-112-64Z" />
            <path d="M205-40Q188-120 160-178Q140-112 112-64Z" />
            <path d="M-46-88Q-10-150 0-265Q10-150 46-88Z" />
            <path d="M-42 88Q-8 160 0 305Q8 160 42 88Z" />
            {eyeDrips.map(([x, top, bottom]) => (
              <rect key={x} x={x - 7} y={top} width="14" height={bottom - top} rx="7" />
            ))}
          </svg>
          <div className="eye-socket">
            <svg className="eye-iris" viewBox="-75 -75 150 150">
              <path d="M-75 0A75 75 0 1 0 75 0A75 75 0 1 0-75 0ZM0-40Q16 0 0 40Q-16 0 0-40Z" fillRule="evenodd" />
            </svg>
            <svg className="eye-lid" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0H100V60Q50 140 0 60Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrescentMoon() {
  return (
    <div className="crescent-moon" aria-hidden="true">
      <svg viewBox="-120 -120 240 240">
        <defs>
          <linearGradient id="moon-shade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--moon)" }} />
            <stop offset="1" style={{ stopColor: "var(--moon-crater)" }} />
          </linearGradient>
        </defs>
        <path d="M0.2-100A100 100 0 1 0 87.7 48.1A86 86 0 0 1 0.2-100Z" className="moon-disc" />
      </svg>
    </div>
  );
}

function SparkleLayer() {
  return (
    <svg className="scene-layer sparkle-layer" viewBox="0 0 1200 600" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      {sparkles.map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`}
        />
      ))}
    </svg>
  );
}

function BirdLayer() {
  return (
    <svg className="scene-layer bird-layer" viewBox="0 0 1200 600" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
      <path d="M1050 70q8-8 16 0q8-8 16 0" />
      <path d="M1100 45q6-6 12 0q6-6 12 0" />
      <path d="M1130 120q7-7 14 0q7-7 14 0" />
    </svg>
  );
}

function TownStrip({ kind }: { kind: "far" | "near" }) {
  const base = 300;
  const town = kind === "far" ? farTown : nearTown;
  return (
    <svg className={`town-strip town-${kind}`} viewBox="0 0 2400 300" aria-hidden="true">
      {[0, 1200].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          <g className="town-shapes">
            {town.map((b, i) => <g key={i}>{buildingShape(b, base)}</g>)}
          </g>
          {kind === "near" && (
            <g className="town-windows">
              {town.flatMap(([x, w, h], i) =>
                [0.3, 0.62].filter((_, j) => (i + j) % 3 !== 0 && h > 50).map((p) => (
                  <rect key={`${i}-${p}`} x={x + w * p} y={base - h * 0.7} width="7" height="11" rx="3" />
                )),
              )}
              {town.filter(([, , , top]) => top === "clock").map(([x, w, h], i) => (
                <circle key={`clock-${i}`} cx={x + w / 2} cy={base - h + 22} r="11" />
              ))}
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

type TrailPoint = { x: number; y: number; t: number };

function CursorTrail({ enabled }: { enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!enabled || !canvas || !ctx || !window.matchMedia("(pointer: fine)").matches) return;
    const life = 420;
    const points: TrailPoint[] = [];
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    let color = "";
    let core = "";
    let frame = 0;

    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const stroke = (alpha: number, width: number, now: number) => {
      for (let i = 1; i < points.length; i++) {
        const fade = 1 - (now - points[i].t) / life;
        ctx.globalAlpha = alpha * fade;
        ctx.lineWidth = width * fade;
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }
    };
    const draw = (now: number) => {
      while (points.length && now - points[0].t > life) points.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (points.length < 2) {
        frame = 0;
        return;
      }
      ctx.strokeStyle = color;
      stroke(0.2, 22, now);
      stroke(0.45, 10, now);
      ctx.strokeStyle = core;
      stroke(1, 3.5, now);
      const head = points[points.length - 1];
      const headFade = 1 - (now - head.t) / life;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3 * headFade;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = core;
      ctx.globalAlpha = headFade;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      points.push({ x: event.clientX, y: event.clientY, t: performance.now() });
      if (!frame) {
        const styles = getComputedStyle(document.documentElement);
        color = styles.getPropertyValue("--accent").trim();
        core = styles.getPropertyValue("--gold").trim();
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    ctx.lineCap = "round";
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
  }, [enabled]);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}

function SectionHeading({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-heading reveal">
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

type Energy = { id: number; path: string; x: number; y: number };

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* Theme persistence is optional. */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [motion, setMotion] = useState<boolean | null>(() => {
    try {
      const saved = localStorage.getItem("portfolio-motion");
      return saved === "on" ? true : saved === "off" ? false : null;
    } catch {
      return null;
    }
  });
  const energyEnabled = motion ?? !systemReduced;
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const actionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const energyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#fbf5ec" : "#170e0f");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme persistence is optional. */
    }
  }, [theme]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setSystemReduced(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = energyEnabled ? "on" : "off";
    try {
      if (motion !== null)
        localStorage.setItem("portfolio-motion", motion ? "on" : "off");
    } catch {
      /* Local storage is optional. */
    }
    if (!energyEnabled) setEnergy(null);
  }, [energyEnabled, motion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = heroStageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      stage.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [showAll]);

  useEffect(() => {
    if (!selectedProject || !dialogRef.current) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(actionTimer.current);
      clearTimeout(energyTimer.current);
      clearTimeout(copyTimer.current);
    };
  }, []);

  function channel(element: HTMLElement, action?: () => void) {
    clearTimeout(actionTimer.current);
    clearTimeout(energyTimer.current);
    if (!energyEnabled) {
      action?.();
      return;
    }
    let source = previousRef.current?.getBoundingClientRect();
    if (
      !source ||
      source.bottom < 0 ||
      source.top > innerHeight ||
      previousRef.current === element
    )
      source = logoRef.current?.getBoundingClientRect();
    const target = element.getBoundingClientRect();
    const x1 = source ? source.left + source.width / 2 : innerWidth / 2;
    const y1 = source ? source.top + source.height / 2 : 40;
    const x2 = target.left + target.width / 2;
    const y2 = target.top + target.height / 2;
    const bend = Math.min(180, Math.max(65, Math.abs(x2 - x1) * 0.25));
    setEnergy({
      id: Date.now(),
      path: `M ${x1} ${y1} C ${x1} ${y1 + bend}, ${x2} ${Math.max(15, y2 - bend)}, ${x2} ${y2}`,
      x: x2,
      y: y2,
    });
    previousRef.current = element;
    if (action) actionTimer.current = setTimeout(action, 560);
    energyTimer.current = setTimeout(() => setEnergy(null), 1200);
  }

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    channel(event.currentTarget, () => {
      setMenuOpen(false);
      const destination = document.getElementById(id);
      history.pushState(null, "", `#${id}`);
      destination?.scrollIntoView({
        behavior: energyEnabled ? "smooth" : "instant",
        block: "start",
      });
      destination?.focus({ preventScroll: true });
    });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const visibleProjects = showAll ? projects : projects.slice(0, 3);
  const navItems = [
    { id: "work", label: "Work" },
    { id: "journey", label: "Journey" },
    { id: "skills", label: "Skills" },
  ];
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <>
      <a className="skip-link" href="#work">Skip to content</a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" ref={logoRef} onClick={(event) => navigate(event, "home")} aria-label="Phi Nguyen, back to top">
            <Seal />
            <span>Phi Nguyen</span>
          </a>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation" id="main-navigation">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined} onClick={(event) => navigate(event, item.id)}>
                {item.label}
              </a>
            ))}
            <a className="nav-contact" href="#contact" onClick={(event) => navigate(event, "contact")}>
              Let’s talk <Icon name="arrow" />
            </a>
          </nav>
          <div className="header-controls">
            <button type="button" className="motion-toggle" aria-pressed={energyEnabled} aria-label="Animations" onClick={() => setMotion(!energyEnabled)} title={`Turn animations ${energyEnabled ? "off" : "on"}; defaults to your system preference`}>
              <Icon name={energyEnabled ? "motion" : "motionOff"} />
              <span className="motion-label">Motion {energyEnabled ? "on" : "off"}</span>
            </button>
            <button type="button" className="icon-button" aria-label={`Switch to ${nextTheme} theme`} title={`Switch to ${nextTheme} theme`} onClick={() => setTheme(nextTheme)}>
              <Icon name={theme === "light" ? "moon" : "sun"} />
            </button>
            <button type="button" ref={menuButtonRef} className="menu-toggle icon-button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container" id="home" tabIndex={-1} aria-labelledby="hero-title">
          <div className="hero-stage" ref={heroStageRef}>
            <SparkleLayer />
            <SkyEye />
            <CrescentMoon />
            <BirdLayer />
            <CloudStrip className="cloud-back" clouds={[[40, 100, 0.6], [420, 70, 0.45], [700, 110, 0.9], [1010, 95, 0.7]]} />
            <TownStrip kind="far" />
            <TownStrip kind="near" />
            <CloudStrip className="cloud-front" clouds={[[-40, 132, 1.2], [330, 138, 0.9], [620, 130, 1.3], [960, 136, 1]]} />
            <div className="hero-content">
              <p className="hero-kicker">Hello, I’m Phi Nguyen</p>
              <h1 id="hero-title">
                A little mystery.
                <br />A lot of <em>engineering.</em>
              </h1>
              <p className="hero-description">
                Senior DevOps & Platform Engineer. I turn complex systems into calm, reliable platforms.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work" onClick={(event) => navigate(event, "work")}>
                  See my work <Icon name="arrow" />
                </a>
                <a className="button button-secondary" href={profile.cv} download onClick={(event) => channel(event.currentTarget)}>
                  Download CV <Icon name="download" />
                </a>
              </div>
            </div>
            <div className="hero-art">
              <MiniCard className="mini-card-left" rotate={-14} />
              <MiniCard className="mini-card-right" rotate={12} />
              <figure className="hero-card">
                <img src="/images/fool-tarot.jpg" width="720" height="1280" alt="Tarot card of The Fool: a masked clown magician in a top hat holding a glowing eye and a fan of cards, beneath an all-seeing eye, with a black cat at his feet" fetchPriority="high" />
                <figcaption>0 · The Fool</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section container" id="work" tabIndex={-1} aria-labelledby="work-title">
          <SectionHeading label="Selected work" title={<span id="work-title">Things I’ve <em>built.</em></span>} />
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <button type="button" className={`project-card project-${project.icon} reveal`} key={project.id} onClick={(event) => channel(event.currentTarget, () => setSelectedProject(project))} aria-label={`Read about ${project.title}`}>
                <span className="project-art">
                  <ArtifactSymbol kind={project.icon} />
                </span>
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="project-open">
                  Read more <Icon name="arrow" />
                </span>
              </button>
            ))}
          </div>
          <div className="archive-action">
            <button type="button" className="text-button" onClick={(event) => channel(event.currentTarget, () => setShowAll(!showAll))}>
              {showAll ? "Show fewer" : `View all ${projects.length} projects`}
              <Icon className={showAll ? "rotated" : ""} name="chevron" />
            </button>
          </div>
        </section>

        <section className="section container" id="journey" tabIndex={-1} aria-labelledby="journey-title">
          <SectionHeading label="The journey" title={<span id="journey-title">9+ years, <em>three chapters.</em></span>}>
            <a className="inline-link" href={profile.cv} download>
              Full CV <Icon name="download" />
            </a>
          </SectionHeading>
          <div className="timeline">
            {experience.map((job, index) => (
              <details className="timeline-item reveal" key={job.company} onToggle={(event) => { if (event.currentTarget.open) channel(event.currentTarget); }}>
                <summary>
                  <span className="timeline-marker">{job.chapter}</span>
                  <span className="timeline-heading">
                    <strong>{job.company === "Collaboration Better The World" ? "CBTW" : job.company}</strong>
                    <span>{job.role}</span>
                  </span>
                  <span className="timeline-period">
                    {index === 0 && <span className="current-label">Now</span>}
                    {job.period.toLowerCase()}
                  </span>
                  <Icon name="chevron" />
                </summary>
                <p className="timeline-content">{job.description}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section container" id="skills" tabIndex={-1} aria-labelledby="skills-title">
          <SectionHeading label="Tools of the craft" title={<span id="skills-title">A practical kind <em>of magic.</em></span>} />
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <div className="skill-card reveal" key={group.title}>
                <ArtifactSymbol kind={group.icon} />
                <h3>{group.title}</h3>
                <div className="tags">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section container" id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <div className="contact-inner reveal">
            <h2 id="contact-title">
              Let’s build something <em>worth it.</em>
            </h2>
            <p>A new challenge, an idea, or just a hello.</p>
            <a className="button button-primary" href={`mailto:${profile.email}`} onClick={(event) => channel(event.currentTarget)}>
              {profile.email} <Icon name="arrow" />
            </a>
            <div className="contact-actions">
              <a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" />GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" />LinkedIn</a>
              <button type="button" onClick={copyEmail}>
                <Icon name="mail" />
                <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <span className="footer-brand"><Seal />Phi Nguyen © {new Date().getFullYear()}</span>
      </footer>

      <CursorTrail enabled={energyEnabled} />

      {energy && (
        <svg className="energy-layer" key={energy.id} aria-hidden="true">
          <defs>
            <filter id="energy-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d={energy.path} className="energy-ghost" />
          <path d={energy.path} pathLength="1000" className="energy-trail" filter="url(#energy-glow)" />
          <circle r="3.5" fill="#fff0c9" filter="url(#energy-glow)">
            <animateMotion dur="0.6s" path={energy.path} fill="freeze" />
          </circle>
          <circle cx={energy.x} cy={energy.y} r="24" className="energy-arrival" />
        </svg>
      )}

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="dialog-title"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {selectedProject && (
          <div className="dialog-inner">
            <button type="button" className="dialog-close icon-button" aria-label="Close project details" onClick={() => dialogRef.current?.close()} autoFocus>
              <Icon name="close" />
            </button>
            <span className="eyebrow">{selectedProject.category} · {selectedProject.period.toLowerCase()}</span>
            <h2 id="dialog-title">{selectedProject.title}</h2>
            <p className="dialog-role">{selectedProject.role}</p>
            <p className="dialog-summary">{selectedProject.summary}</p>
            <h3>What I did</h3>
            <ul>
              {selectedProject.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="tags">
              {selectedProject.technologies.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
