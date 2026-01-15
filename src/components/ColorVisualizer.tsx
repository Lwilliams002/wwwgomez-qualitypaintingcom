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
    { name: "Light Gray", color: "#d4d4d4" },
    { name: "Cream", color: "#f5f0dc" },
  ],
  roof: [
    { name: "Dark Brown", color: "#4a3728" },
    { name: "Charcoal", color: "#3d3d3d" },
    { name: "Slate Gray", color: "#5a6066" },
    { name: "Dark Green", color: "#2d4a3e" },
    { name: "Terracotta", color: "#8b4513" },
    { name: "Black", color: "#1a1a1a" },
  ],
  door: [
    { name: "Navy Blue", color: "#1e3a5f" },
    { name: "Forest Green", color: "#2d4a3e" },
    { name: "Burgundy", color: "#722f37" },
    { name: "Black", color: "#1a1a1a" },
    { name: "Red", color: "#8b2323" },
    { name: "Teal", color: "#264447" },
  ],
  frames: [
    { name: "White", color: "#ffffff" },
    { name: "Off White", color: "#f5f5f0" },
    { name: "Light Gray", color: "#d0d0d0" },
    { name: "Cream", color: "#f5f0e1" },
    { name: "Black", color: "#1a1a1a" },
  ],
  trim: [
    { name: "White", color: "#ffffff" },
    { name: "Cream", color: "#f5efe6" },
    { name: "Light Gray", color: "#e0e0e0" },
    { name: "Tan", color: "#c4b7a6" },
  ],
};

const palettePresets: PalettePreset[] = [
  {
    name: "Modern",
    colors: {
      wall: "#d4d4d4",
      roof: "#3d3d3d",
      door: "#1e3a5f",
      frames: "#ffffff",
      trim: "#ffffff",
    },
  },
  {
    name: "Classic",
    colors: {
      wall: "#f5f0dc",
      roof: "#4a3728",
      door: "#722f37",
      frames: "#ffffff",
      trim: "#ffffff",
    },
  },
  {
    name: "Craftsman",
    colors: {
      wall: "#c8d4c5",
      roof: "#2d4a3e",
      door: "#2d4a3e",
      frames: "#f5f5f0",
      trim: "#f5efe6",
    },
  },
];

const defaultColors: Record<SectionKey, string> = {
  wall: "#e8e4dc",
  roof: "#4a3728",
  door: "#1e3a5f",
  frames: "#ffffff",
  trim: "#ffffff",
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
    trim: "Trim",
  };

  // Helper to darken/lighten colors for shading
  const adjustColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  const wallDark = adjustColor(colors.wall, -15);
  const wallLight = adjustColor(colors.wall, 10);
  const roofDark = adjustColor(colors.roof, -20);
  const roofLight = adjustColor(colors.roof, 15);
  const trimDark = adjustColor(colors.trim, -10);

  return (
    <section className="py-16 bg-section-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Realistic House SVG */}
          <div className="bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 p-6 rounded-lg shadow-lg overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full h-auto">
              <defs>
                {/* Sky gradient */}
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#87CEEB" />
                  <stop offset="70%" stopColor="#E0F4FF" />
                  <stop offset="100%" stopColor="#F0F8FF" />
                </linearGradient>
                
                {/* Ground gradient */}
                <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7CB342" />
                  <stop offset="100%" stopColor="#558B2F" />
                </linearGradient>

                {/* Wall siding texture pattern */}
                <pattern id="sidingPattern" patternUnits="userSpaceOnUse" width="60" height="8">
                  <rect width="60" height="8" fill={colors.wall} />
                  <line x1="0" y1="7.5" x2="60" y2="7.5" stroke={wallDark} strokeWidth="1" opacity="0.3" />
                </pattern>

                {/* Roof shingle pattern */}
                <pattern id="shinglePattern" patternUnits="userSpaceOnUse" width="30" height="15">
                  <rect width="30" height="15" fill={colors.roof} />
                  <path d="M0 0 Q15 5 30 0 L30 3 Q15 8 0 3 Z" fill={roofLight} opacity="0.15" />
                  <line x1="0" y1="14" x2="30" y2="14" stroke={roofDark} strokeWidth="0.5" opacity="0.4" />
                  <line x1="15" y1="0" x2="15" y2="15" stroke={roofDark} strokeWidth="0.3" opacity="0.2" />
                </pattern>

                {/* Wall gradient for 3D effect */}
                <linearGradient id="wallGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={wallLight} />
                  <stop offset="50%" stopColor={colors.wall} />
                  <stop offset="100%" stopColor={wallDark} />
                </linearGradient>

                {/* Roof gradient */}
                <linearGradient id="roofGradientMain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={roofLight} />
                  <stop offset="100%" stopColor={roofDark} />
                </linearGradient>

                {/* Window glass gradient */}
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c5dff5" />
                  <stop offset="30%" stopColor="#a8c8e8" />
                  <stop offset="70%" stopColor="#87b5d8" />
                  <stop offset="100%" stopColor="#6a9fc2" />
                </linearGradient>

                {/* Door panel gradient */}
                <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={adjustColor(colors.door, 10)} />
                  <stop offset="50%" stopColor={colors.door} />
                  <stop offset="100%" stopColor={adjustColor(colors.door, -15)} />
                </linearGradient>

                {/* Shadow filter */}
                <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.25" />
                </filter>

                {/* Soft shadow for depth */}
                <filter id="softShadow">
                  <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Background */}
              <rect width="800" height="600" fill="url(#skyGradient)" />
              
              {/* Ground/Lawn */}
              <ellipse cx="400" cy="600" rx="500" ry="150" fill="url(#groundGradient)" />
              
              {/* Driveway */}
              <path d="M320 520 L360 450 L440 450 L480 520 Z" fill="#9e9e9e" />
              <path d="M325 520 L362 455 L438 455 L475 520 Z" fill="#bdbdbd" />

              {/* Main House Structure */}
              <g filter="url(#dropShadow)">
                {/* Main house body - left section */}
                <rect x="120" y="280" width="280" height="180" fill="url(#sidingPattern)" />
                <rect x="120" y="280" width="280" height="180" fill="url(#wallGradientMain)" opacity="0.3" />
                
                {/* Main house body - right section (garage) */}
                <rect x="400" y="300" width="200" height="160" fill="url(#sidingPattern)" />
                <rect x="400" y="300" width="200" height="160" fill={wallDark} opacity="0.1" />

                {/* Foundation */}
                <rect x="115" y="455" width="290" height="10" fill="#8d8d8d" />
                <rect x="395" y="455" width="210" height="10" fill="#8d8d8d" />
              </g>

              {/* Main Roof */}
              <g filter="url(#softShadow)">
                {/* Left roof section */}
                <polygon points="100,280 260,150 420,280" fill="url(#shinglePattern)" />
                <polygon points="100,280 260,150 420,280" fill="url(#roofGradientMain)" opacity="0.4" />
                
                {/* Right roof section (lower) */}
                <polygon points="380,300 500,220 620,300" fill="url(#shinglePattern)" />
                <polygon points="380,300 500,220 620,300" fill="url(#roofGradientMain)" opacity="0.4" />

                {/* Roof trim/fascia - left */}
                <polygon points="95,283 260,148 425,283 420,280 260,152 100,280" fill={colors.trim} />
                
                {/* Roof trim/fascia - right */}
                <polygon points="375,303 500,218 625,303 620,300 500,222 380,300" fill={colors.trim} />
              </g>

              {/* Chimney */}
              <rect x="320" y="170" width="35" height="70" fill="#8b7355" />
              <rect x="315" y="165" width="45" height="10" fill="#6d5a45" />

              {/* Front Porch */}
              <rect x="200" y="400" width="180" height="60" fill="#c4b7a6" />
              <rect x="200" y="395" width="180" height="8" fill={colors.trim} />
              
              {/* Porch columns */}
              <rect x="210" y="340" width="12" height="60" fill={colors.trim} />
              <rect x="210" y="335" width="12" height="8" fill={trimDark} />
              <rect x="358" y="340" width="12" height="60" fill={colors.trim} />
              <rect x="358" y="335" width="12" height="8" fill={trimDark} />

              {/* Porch roof */}
              <polygon points="195,340 290,290 385,340" fill={colors.roof} />
              <polygon points="190,343 290,288 390,343 385,340 290,292 195,340" fill={colors.trim} />

              {/* Front Door */}
              <g>
                <rect x="265" y="340" width="50" height="85" fill="url(#doorGradient)" rx="2" />
                {/* Door panels */}
                <rect x="272" y="350" width="36" height="30" fill={adjustColor(colors.door, -10)} rx="1" opacity="0.6" />
                <rect x="272" y="388" width="36" height="30" fill={adjustColor(colors.door, -10)} rx="1" opacity="0.6" />
                {/* Door handle */}
                <circle cx="302" cy="385" r="4" fill="#d4af37" />
                {/* Door frame */}
                <rect x="260" y="335" width="60" height="5" fill={colors.trim} />
                <rect x="260" y="340" width="5" height="85" fill={colors.trim} />
                <rect x="315" y="340" width="5" height="85" fill={colors.trim} />
              </g>

              {/* Windows - Main floor left */}
              <g>
                <rect x="145" y="320" width="55" height="70" fill={colors.frames} rx="1" />
                <rect x="150" y="325" width="45" height="60" fill="url(#glassGradient)" />
                <line x1="172.5" y1="325" x2="172.5" y2="385" stroke={colors.frames} strokeWidth="3" />
                <line x1="150" y1="355" x2="195" y2="355" stroke={colors.frames} strokeWidth="3" />
                {/* Window sill */}
                <rect x="142" y="388" width="61" height="6" fill={colors.trim} />
              </g>

              {/* Windows - Second floor */}
              <g>
                <rect x="175" y="200" width="45" height="55" fill={colors.frames} rx="1" />
                <rect x="180" y="205" width="35" height="45" fill="url(#glassGradient)" />
                <line x1="197.5" y1="205" x2="197.5" y2="250" stroke={colors.frames} strokeWidth="2" />
                <line x1="180" y1="227.5" x2="215" y2="227.5" stroke={colors.frames} strokeWidth="2" />
                <rect x="172" y="253" width="51" height="5" fill={colors.trim} />
              </g>

              <g>
                <rect x="300" y="200" width="45" height="55" fill={colors.frames} rx="1" />
                <rect x="305" y="205" width="35" height="45" fill="url(#glassGradient)" />
                <line x1="322.5" y1="205" x2="322.5" y2="250" stroke={colors.frames} strokeWidth="2" />
                <line x1="305" y1="227.5" x2="340" y2="227.5" stroke={colors.frames} strokeWidth="2" />
                <rect x="297" y="253" width="51" height="5" fill={colors.trim} />
              </g>

              {/* Garage Door */}
              <g>
                <rect x="430" y="340" width="140" height="115" fill="#e0e0e0" rx="2" />
                <rect x="435" y="345" width="130" height="105" fill="#d0d0d0" />
                {/* Garage door panels */}
                <line x1="435" y1="370" x2="565" y2="370" stroke="#bbb" strokeWidth="2" />
                <line x1="435" y1="395" x2="565" y2="395" stroke="#bbb" strokeWidth="2" />
                <line x1="435" y1="420" x2="565" y2="420" stroke="#bbb" strokeWidth="2" />
                {/* Garage windows */}
                <rect x="445" y="350" width="25" height="15" fill="url(#glassGradient)" />
                <rect x="488" y="350" width="25" height="15" fill="url(#glassGradient)" />
                <rect x="530" y="350" width="25" height="15" fill="url(#glassGradient)" />
              </g>

              {/* Garage side window */}
              <g>
                <rect x="430" y="320" width="35" height="40" fill={colors.frames} rx="1" />
                <rect x="434" y="324" width="27" height="32" fill="url(#glassGradient)" />
                <line x1="447.5" y1="324" x2="447.5" y2="356" stroke={colors.frames} strokeWidth="2" />
              </g>

              {/* Shutters for main window */}
              <rect x="135" y="318" width="10" height="74" fill={colors.door} opacity="0.9" />
              <rect x="200" y="318" width="10" height="74" fill={colors.door} opacity="0.9" />

              {/* Landscaping - bushes */}
              <ellipse cx="140" cy="465" rx="30" ry="20" fill="#2e7d32" />
              <ellipse cx="160" cy="465" rx="25" ry="18" fill="#388e3c" />
              <ellipse cx="580" cy="465" rx="35" ry="22" fill="#2e7d32" />
              <ellipse cx="550" cy="465" rx="28" ry="18" fill="#388e3c" />

              {/* Flowers */}
              <circle cx="185" cy="458" r="4" fill="#e91e63" />
              <circle cx="195" cy="462" r="3" fill="#f48fb1" />
              <circle cx="525" cy="460" r="4" fill="#ffeb3b" />
              <circle cx="535" cy="456" r="3" fill="#fff176" />

              {/* Selection highlight */}
              {activeSection === "wall" && (
                <rect x="118" y="278" width="284" height="184" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
              )}
              {activeSection === "roof" && (
                <>
                  <polygon points="98,282 260,148 422,282" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
                  <polygon points="378,302 500,218 622,302" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
                </>
              )}
              {activeSection === "door" && (
                <rect x="263" y="338" width="54" height="89" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
              )}
              {activeSection === "frames" && (
                <>
                  <rect x="143" y="318" width="59" height="74" fill="none" stroke="#AF9D5E" strokeWidth="3" strokeDasharray="8,4" opacity="0.9" />
                  <rect x="173" y="198" width="49" height="59" fill="none" stroke="#AF9D5E" strokeWidth="3" strokeDasharray="8,4" opacity="0.9" />
                  <rect x="298" y="198" width="49" height="59" fill="none" stroke="#AF9D5E" strokeWidth="3" strokeDasharray="8,4" opacity="0.9" />
                </>
              )}
              {activeSection === "trim" && (
                <polygon points="93,285 260,146 427,285 420,280 260,154 100,280" fill="none" stroke="#AF9D5E" strokeWidth="4" strokeDasharray="10,5" opacity="0.9" />
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
