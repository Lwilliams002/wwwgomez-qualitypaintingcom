import { useState, useCallback } from "react";
import { RotateCcw, Shuffle, Palette } from "lucide-react";

type SectionKey = "wall" | "roof" | "door" | "frames" | "trim";

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
    { name: "White", color: "#ffffff" },
    { name: "Warm White", color: "#f5efe6" },
    { name: "Light Beige", color: "#dcd2c4" },
    { name: "Taupe", color: "#b9aa94" },
    { name: "Sage Green", color: "#c8d4c5" },
    { name: "Soft Blue", color: "#ccd5de" },
  ],
  roof: [
    { name: "Dark Brown", color: "#5b4a3c" },
    { name: "Medium Brown", color: "#7a5a3a" },
    { name: "Clay", color: "#9c6b3c" },
    { name: "Charcoal", color: "#3d3d3d" },
    { name: "Slate Gray", color: "#5a5a5a" },
  ],
  door: [
    { name: "Espresso", color: "#3b2b22" },
    { name: "Walnut", color: "#5c4033" },
    { name: "Charcoal", color: "#2f4f4f" },
    { name: "Navy", color: "#2c3e50" },
    { name: "Red", color: "#8b2323" },
    { name: "Forest Green", color: "#2d4a3e" },
  ],
  frames: [
    { name: "White", color: "#ffffff" },
    { name: "Off White", color: "#e5e5e5" },
    { name: "Light Gray", color: "#c0c0c0" },
    { name: "Cream", color: "#f5f0e1" },
  ],
  trim: [
    { name: "Cream", color: "#f5efe6" },
    { name: "Sand", color: "#d7cbbb" },
    { name: "Tan", color: "#b79b7f" },
    { name: "White", color: "#ffffff" },
  ],
};

const palettePresets: PalettePreset[] = [
  {
    name: "Modern",
    colors: {
      wall: "#f5efe6",
      roof: "#3d3d3d",
      door: "#2c3e50",
      frames: "#ffffff",
      trim: "#ffffff",
    },
  },
  {
    name: "Classic",
    colors: {
      wall: "#ffffff",
      roof: "#5b4a3c",
      door: "#3b2b22",
      frames: "#e5e5e5",
      trim: "#d7cbbb",
    },
  },
  {
    name: "Warm",
    colors: {
      wall: "#dcd2c4",
      roof: "#7a5a3a",
      door: "#8b2323",
      frames: "#f5f0e1",
      trim: "#b79b7f",
    },
  },
];

const defaultColors: Record<SectionKey, string> = {
  wall: "#ffffff",
  roof: "#524337",
  door: "#264447",
  frames: "#cbc8c4",
  trim: "#d5c9bc",
};

const ColorVisualizer = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("wall");
  const [colors, setColors] = useState<Record<SectionKey, string>>(defaultColors);
  const [customColor, setCustomColor] = useState("#ffffff");

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
    frames: "Window Frames",
    trim: "Roof Trim",
  };

  // Generate SVG gradient/filter IDs
  const wallGradientId = "wallGradient";
  const roofGradientId = "roofGradient";

  return (
    <section className="py-16 bg-section-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* SVG House Preview */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className="w-full h-auto">
              <defs>
                {/* Wall gradient for realistic paint look */}
                <linearGradient id={wallGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colors.wall} stopOpacity="1" />
                  <stop offset="50%" stopColor={colors.wall} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={adjustBrightness(colors.wall, -10)} stopOpacity="1" />
                </linearGradient>
                
                {/* Roof gradient */}
                <linearGradient id={roofGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colors.roof} stopOpacity="1" />
                  <stop offset="100%" stopColor={adjustBrightness(colors.roof, -15)} stopOpacity="1" />
                </linearGradient>

                {/* Shadow filter */}
                <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
                </filter>

                {/* Subtle texture pattern */}
                <pattern id="texture" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="transparent" />
                  <circle cx="1" cy="1" r="0.5" fill="rgba(0,0,0,0.02)" />
                </pattern>
              </defs>

              {/* Ground / front yard */}
              <g id="ground">
                <rect fill="#d3cac2" x="60" y="460" width="1080" height="260" />
                <path fill="#c8beb6" d="M560 460 L640 460 L670 720 L530 720 Z" />
              </g>

              {/* House body */}
              <g id="house" filter="url(#shadowFilter)">
                {/* Main wall rectangle with gradient */}
                <rect 
                  fill={`url(#${wallGradientId})`}
                  stroke="#4f4f4f" 
                  strokeWidth="3" 
                  strokeLinejoin="round"
                  x="260" y="320" width="680" height="280" 
                />
                {/* Texture overlay */}
                <rect 
                  fill="url(#texture)"
                  x="260" y="320" width="680" height="280" 
                />
                
                {/* Gable wall face */}
                <path
                  fill={colors.wall}
                  d="M260 320 L600 210 L940 320 Z"
                />

                {/* Lower roof (porch) */}
                <g id="roof-porch">
                  <path
                    fill={`url(#${roofGradientId})`}
                    stroke="#4f4f4f"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    d="M445 352 L600 282 L755 352 Z"
                  />
                  <path
                    fill={colors.trim}
                    d="M445 352 L600 282 L755 352 L747 356 L600 288 L453 356 Z"
                  />
                </g>

                {/* Upper main roof */}
                <g id="roof-main">
                  <path
                    fill={`url(#${roofGradientId})`}
                    stroke="#4f4f4f"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    d="M240 310 L600 160 L960 310 Z"
                  />
                  <path
                    fill={colors.trim}
                    d="M240 310 L600 160 L960 310 L950 315 L600 170 L250 315 Z"
                  />
                </g>

                {/* Left window group */}
                <g id="window-left">
                  <rect fill={colors.frames} stroke="#4f4f4f" strokeWidth="3" strokeLinejoin="round" x="320" y="370" width="150" height="140" />
                  <rect fill="#e5e5e5" x="340" y="390" width="110" height="100" />
                  <line stroke="#4f4f4f" strokeWidth="3" x1="395" y1="390" x2="395" y2="490" />
                  <line stroke="#4f4f4f" strokeWidth="3" x1="340" y1="440" x2="450" y2="440" />
                </g>

                {/* Right window group */}
                <g id="window-right">
                  <rect fill={colors.frames} stroke="#4f4f4f" strokeWidth="3" strokeLinejoin="round" x="730" y="370" width="150" height="140" />
                  <rect fill="#e5e5e5" x="750" y="390" width="110" height="100" />
                  <line stroke="#4f4f4f" strokeWidth="3" x1="805" y1="390" x2="805" y2="490" />
                  <line stroke="#4f4f4f" strokeWidth="3" x1="750" y1="440" x2="860" y2="440" />
                </g>

                {/* Door group */}
                <g id="door-group">
                  <rect fill={colors.frames} stroke="#4f4f4f" strokeWidth="3" strokeLinejoin="round" x="645" y="395" width="40" height="145" />
                  <rect fill={colors.frames} stroke="#4f4f4f" strokeWidth="3" strokeLinejoin="round" x="555" y="360" width="130" height="200" />
                  <rect fill={colors.door} x="575" y="380" width="90" height="160" />
                  <rect fill={adjustBrightness(colors.door, 10)} x="590" y="395" width="60" height="120" />
                  <circle cx="655" cy="465" r="6" fill="#e8e1d5" />
                </g>
              </g>

              {/* Highlight indicator for active section */}
              {activeSection === "wall" && (
                <rect x="258" y="318" width="684" height="284" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.8" />
              )}
              {activeSection === "roof" && (
                <path d="M238 308 L600 158 L962 308" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.8" />
              )}
              {activeSection === "door" && (
                <rect x="573" y="378" width="94" height="164" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.8" />
              )}
              {activeSection === "frames" && (
                <>
                  <rect x="318" y="368" width="154" height="144" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.8" />
                  <rect x="728" y="368" width="154" height="144" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.8" />
                </>
              )}
              {activeSection === "trim" && (
                <path d="M240 310 L600 160 L960 310 L950 315 L600 170 L250 315 Z" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.8" />
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
                    className="color-swatch-btn"
                    style={{ "--swatch-color": option.color } as React.CSSProperties}
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

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

export default ColorVisualizer;
