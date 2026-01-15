import { useState, useCallback } from "react";
import { RotateCcw, Shuffle, Palette } from "lucide-react";

type SectionKey = "wall" | "roof" | "door" | "frames" | "trim" | "garage" | "accent";

interface ColorOption {
  name: string;
  color: string;
}

interface PalettePreset {
  name: string;
  colors: Record<SectionKey, string>;
}

const sectionColors: Record<SectionKey, ColorOption[]> = {
  wall: [
    { name: "Desert Sand", color: "#e5ddd0" },
    { name: "Warm Beige", color: "#d9cfc0" },
    { name: "Adobe Tan", color: "#c9b99a" },
    { name: "Cream", color: "#f0e8dc" },
    { name: "Santa Fe Clay", color: "#d4b896" },
    { name: "White", color: "#f5f5f0" },
    { name: "Sage", color: "#c8cfc4" },
    { name: "Soft Gray", color: "#d8d8d4" },
  ],
  roof: [
    { name: "Charcoal", color: "#3d3d3d" },
    { name: "Dark Brown", color: "#4a3f35" },
    { name: "Slate", color: "#5a5a5a" },
    { name: "Terracotta", color: "#8b5a3c" },
    { name: "Desert Tan", color: "#a89078" },
    { name: "Black", color: "#2a2a2a" },
  ],
  door: [
    { name: "Navy Blue", color: "#2c3e5a" },
    { name: "Teal", color: "#3d6b6b" },
    { name: "Burgundy", color: "#6b2d3a" },
    { name: "Forest Green", color: "#3d5a45" },
    { name: "Turquoise", color: "#4a8b8b" },
    { name: "Black", color: "#1a1a1a" },
    { name: "Red", color: "#8b3030" },
  ],
  frames: [
    { name: "White", color: "#ffffff" },
    { name: "Cream", color: "#f5f0e5" },
    { name: "Almond", color: "#e8e0d5" },
    { name: "Bronze", color: "#6b5a48" },
    { name: "Black", color: "#2a2a2a" },
  ],
  trim: [
    { name: "White", color: "#ffffff" },
    { name: "Cream", color: "#f0e8dc" },
    { name: "Match Wall", color: "#e5ddd0" },
    { name: "Light Tan", color: "#d9cfc0" },
  ],
  garage: [
    { name: "Tan", color: "#c9b99a" },
    { name: "Almond", color: "#e0d5c5" },
    { name: "White", color: "#f0ebe5" },
    { name: "Desert Sand", color: "#d4c4a8" },
    { name: "Brown", color: "#8b7355" },
  ],
  accent: [
    { name: "Stone Tan", color: "#a89880" },
    { name: "River Rock", color: "#8b8070" },
    { name: "Desert Brown", color: "#9a8a70" },
    { name: "Sandstone", color: "#c4b090" },
    { name: "Slate", color: "#707068" },
  ],
};

const palettePresets: PalettePreset[] = [
  {
    name: "Classic Santa Fe",
    colors: {
      wall: "#e5ddd0",
      roof: "#4a3f35",
      door: "#3d6b6b",
      frames: "#ffffff",
      trim: "#f0e8dc",
      garage: "#c9b99a",
      accent: "#a89880",
    },
  },
  {
    name: "Desert Modern",
    colors: {
      wall: "#f5f5f0",
      roof: "#3d3d3d",
      door: "#2a2a2a",
      frames: "#2a2a2a",
      trim: "#ffffff",
      garage: "#e0d5c5",
      accent: "#707068",
    },
  },
  {
    name: "Warm Adobe",
    colors: {
      wall: "#d4b896",
      roof: "#5a5a5a",
      door: "#6b2d3a",
      frames: "#f5f0e5",
      trim: "#f0e8dc",
      garage: "#d4c4a8",
      accent: "#9a8a70",
    },
  },
];

const defaultColors: Record<SectionKey, string> = {
  wall: "#e5ddd0",
  roof: "#4a3f35",
  door: "#2c3e5a",
  frames: "#ffffff",
  trim: "#f0e8dc",
  garage: "#c9b99a",
  accent: "#a89880",
};

const ColorVisualizer = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("wall");
  const [colors, setColors] = useState<Record<SectionKey, string>>(defaultColors);
  const [customColor, setCustomColor] = useState("#e5ddd0");

  const applyColor = useCallback((color: string) => {
    setColors((prev) => ({ ...prev, [activeSection]: color }));
  }, [activeSection]);

  const applyPreset = (preset: PalettePreset) => {
    setColors(preset.colors);
  };

  const resetColors = () => {
    setColors(defaultColors);
  };

  const randomizeColors = () => {
    const randomized: Record<SectionKey, string> = {} as Record<SectionKey, string>;
    (Object.keys(sectionColors) as SectionKey[]).forEach((key) => {
      const options = sectionColors[key];
      randomized[key] = options[Math.floor(Math.random() * options.length)].color;
    });
    setColors(randomized);
  };

  const sectionLabels: Record<SectionKey, string> = {
    wall: "Walls",
    roof: "Roof",
    door: "Door",
    frames: "Windows",
    trim: "Trim",
    garage: "Garage Door",
    accent: "Stone Accent",
  };

  // Helper to adjust colors for shading
  const adjustColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  const wallDark = adjustColor(colors.wall, -12);
  const wallLight = adjustColor(colors.wall, 8);
  const roofDark = adjustColor(colors.roof, -15);
  const roofMid = adjustColor(colors.roof, 5);
  const garageDark = adjustColor(colors.garage, -15);
  const accentDark = adjustColor(colors.accent, -10);

  return (
    <section className="py-16 bg-section-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Southwest Style House SVG */}
          <div className="rounded-lg shadow-lg overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" className="w-full h-auto">
              <defs>
                {/* Sky gradient - dusk colors */}
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a6fa5" />
                  <stop offset="40%" stopColor="#8da4c7" />
                  <stop offset="70%" stopColor="#c9b8a8" />
                  <stop offset="100%" stopColor="#d4c4b0" />
                </linearGradient>

                {/* Stucco texture pattern */}
                <filter id="stuccoTexture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                  <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1.5" result="light">
                    <feDistantLight azimuth="45" elevation="60" />
                  </feDiffuseLighting>
                  <feBlend in="SourceGraphic" in2="light" mode="multiply" />
                </filter>

                {/* Wall gradients for 3D effect */}
                <linearGradient id="wallGradientMain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={wallLight} />
                  <stop offset="100%" stopColor={wallDark} />
                </linearGradient>

                <linearGradient id="wallGradientSide" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={wallDark} />
                  <stop offset="100%" stopColor={adjustColor(wallDark, -8)} />
                </linearGradient>

                {/* Roof shingle gradient */}
                <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={roofMid} />
                  <stop offset="100%" stopColor={roofDark} />
                </linearGradient>

                {/* Window gradient */}
                <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b8c8d8" />
                  <stop offset="50%" stopColor="#8a9eb5" />
                  <stop offset="100%" stopColor="#6a8098" />
                </linearGradient>

                {/* Garage door gradient */}
                <linearGradient id="garageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colors.garage} />
                  <stop offset="100%" stopColor={garageDark} />
                </linearGradient>

                {/* Door gradient */}
                <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={adjustColor(colors.door, 5)} />
                  <stop offset="100%" stopColor={adjustColor(colors.door, -10)} />
                </linearGradient>

                {/* Ground gravel texture */}
                <pattern id="gravelPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                  <rect width="8" height="8" fill="#6b6560" />
                  <circle cx="2" cy="2" r="1.5" fill="#7a756f" />
                  <circle cx="6" cy="5" r="1.2" fill="#5d5855" />
                  <circle cx="4" cy="7" r="1" fill="#787370" />
                </pattern>
              </defs>

              {/* Sky */}
              <rect width="900" height="500" fill="url(#skyGradient)" />

              {/* Clouds */}
              <ellipse cx="150" cy="80" rx="60" ry="25" fill="#c8b8a8" opacity="0.4" />
              <ellipse cx="180" cy="70" rx="45" ry="20" fill="#d0c0b0" opacity="0.3" />
              <ellipse cx="700" cy="60" rx="70" ry="22" fill="#c5b5a5" opacity="0.35" />

              {/* Trees in background */}
              <g opacity="0.7">
                {/* Left tree */}
                <ellipse cx="80" cy="260" rx="55" ry="70" fill="#4a5a48" />
                <ellipse cx="90" cy="250" rx="45" ry="55" fill="#5a6a55" />
                <rect x="75" y="310" width="15" height="50" fill="#5a4a3a" />
                
                {/* Right trees */}
                <ellipse cx="820" cy="270" rx="50" ry="65" fill="#4a5848" />
                <ellipse cx="800" cy="260" rx="40" ry="50" fill="#5a6855" />
                <rect x="795" y="310" width="12" height="45" fill="#5a4a3a" />
              </g>

              {/* Ground/gravel driveway */}
              <rect x="0" y="380" width="900" height="120" fill="url(#gravelPattern)" />
              <rect x="0" y="380" width="900" height="120" fill="#6b6560" opacity="0.3" />

              {/* Concrete driveway */}
              <path d="M100 380 L280 380 L300 500 L80 500 Z" fill="#9a9590" />
              <path d="M100 380 L280 380 L300 500 L80 500 Z" fill="#a5a09a" opacity="0.5" />

              {/* Desert landscaping - rocks */}
              <ellipse cx="400" cy="410" rx="25" ry="12" fill="#c8c0b5" />
              <ellipse cx="500" cy="405" rx="18" ry="10" fill="#d5cdc2" />
              <ellipse cx="580" cy="415" rx="22" ry="11" fill="#bab2a8" />

              {/* Main House Body - Right Section */}
              <g>
                {/* Main stucco wall */}
                <rect x="280" y="230" width="380" height="150" fill={colors.wall} />
                <rect x="280" y="230" width="380" height="150" fill="url(#wallGradientMain)" opacity="0.3" />
                
                {/* Stone accent band */}
                <rect x="280" y="350" width="380" height="30" fill={colors.accent} />
                <rect x="280" y="350" width="380" height="30" fill={accentDark} opacity="0.2" />
                {/* Stone texture lines */}
                <line x1="320" y1="350" x2="320" y2="380" stroke={accentDark} strokeWidth="1" opacity="0.3" />
                <line x1="380" y1="350" x2="380" y2="380" stroke={accentDark} strokeWidth="1" opacity="0.3" />
                <line x1="450" y1="350" x2="450" y2="380" stroke={accentDark} strokeWidth="1" opacity="0.3" />
                <line x1="520" y1="350" x2="520" y2="380" stroke={accentDark} strokeWidth="1" opacity="0.3" />
                <line x1="590" y1="350" x2="590" y2="380" stroke={accentDark} strokeWidth="1" opacity="0.3" />
              </g>

              {/* Garage Section - Left */}
              <g>
                {/* Garage wall */}
                <rect x="100" y="250" width="180" height="130" fill={colors.wall} />
                <rect x="100" y="250" width="180" height="130" fill="url(#wallGradientMain)" opacity="0.3" />
                
                {/* Side wall (angled shadow) */}
                <polygon points="100,250 100,380 80,400 80,270" fill="url(#wallGradientSide)" />
              </g>

              {/* Main Hip Roof - Right Section */}
              <g>
                <polygon points="260,230 470,140 680,230" fill={colors.roof} />
                <polygon points="260,230 470,140 680,230" fill="url(#roofGradient)" opacity="0.5" />
                {/* Roof fascia/trim */}
                <polygon points="255,233 470,138 685,233 680,230 470,142 260,230" fill={colors.trim} />
              </g>

              {/* Garage Hip Roof */}
              <g>
                <polygon points="80,250 190,180 300,250" fill={colors.roof} />
                <polygon points="80,250 190,180 300,250" fill="url(#roofGradient)" opacity="0.5" />
                {/* Roof fascia */}
                <polygon points="75,253 190,178 305,253 300,250 190,182 80,250" fill={colors.trim} />
              </g>

              {/* Connecting roof section */}
              <polygon points="280,230 310,200 340,230" fill={colors.roof} />

              {/* Garage Door */}
              <g>
                <rect x="120" y="280" width="140" height="100" rx="3" fill="url(#garageGradient)" />
                {/* Garage door panels - 4x4 grid */}
                {[0, 1, 2, 3].map((row) =>
                  [0, 1, 2, 3].map((col) => (
                    <rect
                      key={`panel-${row}-${col}`}
                      x={125 + col * 33}
                      y={285 + row * 23}
                      width="28"
                      height="18"
                      rx="1"
                      fill={garageDark}
                      opacity="0.15"
                    />
                  ))
                )}
                {/* Garage door frame */}
                <rect x="120" y="280" width="140" height="100" rx="3" fill="none" stroke={garageDark} strokeWidth="2" opacity="0.3" />
              </g>

              {/* Wall sconces/lights by garage */}
              <rect x="108" y="295" width="8" height="12" fill="#3a3530" rx="1" />
              <rect x="264" y="295" width="8" height="12" fill="#3a3530" rx="1" />

              {/* Entry area with door */}
              <g>
                {/* Entry alcove */}
                <rect x="295" y="270" width="50" height="110" fill={wallDark} />
                
                {/* Front Door */}
                <rect x="305" y="285" width="35" height="95" fill="url(#doorGradient)" rx="1" />
                {/* Door glass panel */}
                <rect x="312" y="295" width="21" height="50" fill="url(#windowGlass)" rx="1" />
                {/* Door handle */}
                <circle cx="330" cy="350" r="3" fill="#c0a080" />
                
                {/* Entry light */}
                <rect x="340" y="290" width="6" height="10" fill="#3a3530" rx="1" />
              </g>

              {/* Windows - Main section */}
              <g>
                {/* Left large window */}
                <rect x="370" y="270" width="90" height="65" fill={colors.frames} rx="2" />
                <rect x="375" y="275" width="80" height="55" fill="url(#windowGlass)" />
                {/* Blinds effect */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <line
                    key={`blind1-${i}`}
                    x1="376"
                    y1={278 + i * 6.5}
                    x2="454"
                    y2={278 + i * 6.5}
                    stroke="#d5dce5"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                ))}
                {/* Window divider */}
                <line x1="420" y1="275" x2="420" y2="330" stroke={colors.frames} strokeWidth="4" />

                {/* Right large window */}
                <rect x="510" y="270" width="90" height="65" fill={colors.frames} rx="2" />
                <rect x="515" y="275" width="80" height="55" fill="url(#windowGlass)" />
                {/* Blinds effect */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <line
                    key={`blind2-${i}`}
                    x1="516"
                    y1={278 + i * 6.5}
                    x2="594"
                    y2={278 + i * 6.5}
                    stroke="#d5dce5"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                ))}
                {/* Window divider */}
                <line x1="560" y1="275" x2="560" y2="330" stroke={colors.frames} strokeWidth="4" />
              </g>

              {/* Landscaping plants */}
              <g>
                {/* Ornamental grasses - left of entry */}
                <ellipse cx="355" cy="375" rx="20" ry="12" fill="#7a8a60" />
                <ellipse cx="355" cy="368" rx="15" ry="8" fill="#8a9a70" />
                
                {/* Blue agave/yucca - right side */}
                <ellipse cx="640" cy="378" rx="18" ry="10" fill="#6a8090" />
                <path d="M625 378 Q640 355 655 378" fill="#7090a0" />
                
                {/* Small shrubs */}
                <ellipse cx="420" cy="385" rx="15" ry="8" fill="#7a8560" />
                <ellipse cx="550" cy="388" rx="12" ry="7" fill="#6a7555" />
                
                {/* Yellow flowering bush */}
                <ellipse cx="470" cy="382" rx="14" ry="9" fill="#6a7a55" />
                <circle cx="465" cy="378" r="3" fill="#d4a040" />
                <circle cx="472" cy="376" r="2.5" fill="#e0b050" />
                <circle cx="478" cy="379" r="2" fill="#d4a040" />

                {/* Red accent plant */}
                <ellipse cx="700" cy="385" rx="16" ry="9" fill="#5a6a50" />
                <circle cx="695" cy="380" r="4" fill="#c04040" />
                <circle cx="705" cy="382" r="3" fill="#d05050" />
              </g>

              {/* Pathway lights */}
              <rect x="330" y="400" width="4" height="15" fill="#4a4540" />
              <ellipse cx="332" cy="398" rx="4" ry="2" fill="#e0d080" opacity="0.6" />
              <rect x="600" y="405" width="4" height="12" fill="#4a4540" />
              <ellipse cx="602" cy="403" rx="4" ry="2" fill="#e0d080" opacity="0.6" />

              {/* Brick/block wall in background - left */}
              <rect x="0" y="340" width="70" height="60" fill="#9a6050" />
              <rect x="0" y="340" width="70" height="60" fill="#8a5545" opacity="0.3" />

              {/* Selection highlight */}
              {activeSection === "wall" && (
                <>
                  <rect x="278" y="228" width="384" height="124" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
                  <rect x="98" y="248" width="184" height="134" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
                </>
              )}
              {activeSection === "roof" && (
                <>
                  <polygon points="258,232 470,138 682,232" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
                  <polygon points="78,252 190,178 302,252" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
                </>
              )}
              {activeSection === "door" && (
                <rect x="303" y="283" width="39" height="99" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="8,4" opacity="0.9" />
              )}
              {activeSection === "frames" && (
                <>
                  <rect x="368" y="268" width="94" height="69" fill="none" stroke="#AF9D5E" strokeWidth="3" strokeDasharray="8,4" opacity="0.9" />
                  <rect x="508" y="268" width="94" height="69" fill="none" stroke="#AF9D5E" strokeWidth="3" strokeDasharray="8,4" opacity="0.9" />
                </>
              )}
              {activeSection === "trim" && (
                <polygon points="253,235 470,136 687,235 680,230 470,144 260,230" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
              )}
              {activeSection === "garage" && (
                <rect x="118" y="278" width="144" height="104" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
              )}
              {activeSection === "accent" && (
                <rect x="278" y="348" width="384" height="34" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
              )}
            </svg>
          </div>

          {/* Controls */}
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Preview Your Home Colors</h2>
            <p className="text-muted-foreground mb-6">
              Select a part of the house and try different colors to visualize your project.
            </p>

            {/* Section indicator */}
            <div className="mb-4 p-3 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium">Selected: </span>
              <span className="text-primary font-semibold">{sectionLabels[activeSection]}</span>
            </div>

            {/* Section buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(Object.keys(sectionLabels) as SectionKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`color-section-btn ${activeSection === key ? "active" : ""}`}
                >
                  {sectionLabels[key]}
                </button>
              ))}
            </div>

            {/* Color options */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Color Options
              </h4>
              <div className="flex flex-wrap gap-2">
                {sectionColors[activeSection].map((option) => (
                  <button
                    key={option.color}
                    onClick={() => applyColor(option.color)}
                    className={`color-swatch-btn ${colors[activeSection] === option.color ? "ring-2 ring-primary" : ""}`}
                  >
                    <span 
                      className="color-swatch" 
                      style={{ backgroundColor: option.color }}
                    />
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom color picker */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Custom Color
              </h4>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    applyColor(e.target.value);
                  }}
                  className="w-12 h-12 rounded cursor-pointer border-2 border-border"
                />
                <span className="text-sm text-muted-foreground">{customColor.toUpperCase()}</span>
              </div>
            </div>

            {/* Preset palettes */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Curated Palettes
              </h4>
              <div className="flex flex-wrap gap-3">
                {palettePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="btn-gold-outline py-2 px-4 text-xs"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button onClick={resetColors} className="btn-gold-outline flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button onClick={randomizeColors} className="btn-gold flex items-center gap-2">
                <Shuffle className="w-4 h-4" />
                Randomize
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorVisualizer;
