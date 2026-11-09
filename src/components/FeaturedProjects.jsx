import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PROJECTS } from "../data/portfolioData";

// Eight Ribbon Cards mapping directly to Malik's real projects and exact reference media
const RIBBON_PROJECTS = [
  {
    caption: "Hayatabad School ERP",
    category: "Academic Management System",
    liveUrl: "https://hyatabadschool.vercel.app/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_044539_b7fde132-8c25-4dda-ab05-4e4be99bf3d3.png&w=1280&q=85",
    aspect: 1.745,
    tag: "01 / ERP SYSTEM",
  },
  {
    caption: "Foodie Pizza Delivery",
    category: "Online Ordering & Live Dispatch",
    liveUrl: "https://foodie-pizza.vercel.app/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/mossline-hero.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_032528_99eb9a00-a553-40b6-8b97-017e918971c6.png&w=1280&q=85",
    aspect: 1.700,
    tag: "02 / E-COMMERCE",
  },
  {
    caption: "Emerging Edge LMS",
    category: "Interactive Video Curriculum",
    liveUrl: "https://school.emergingedge.tech/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/fernhollow.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261103_061637_11907771-15ce-494b-81a4-9051861d6ce5.png&w=1280&q=85",
    aspect: 1.735,
    tag: "03 / ED-TECH",
  },
  {
    caption: "Veloce Luxury Shoes",
    category: "Editorial Sneaker Storefront",
    liveUrl: "https://veloce-me.vercel.app/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vell-lookbook.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_044911_1ad79156-a8dc-475a-8891-8408a9b61320.png&w=1280&q=85",
    aspect: 1.837,
    tag: "04 / DESIGN SYSTEM",
  },
  {
    caption: "Federal College Portal",
    category: "Academic Admissions Hub",
    liveUrl: "https://fedralportal.oneapp.dev/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vasari-vhs-hero.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_012401_8f947ed0-7b82-47d6-bdcd-b1ce1af0bf5f.png&w=1280&q=85",
    aspect: 1.526,
    tag: "05 / SOFTWARE",
  },
  {
    caption: "Tripora Expeditions",
    category: "Global Travel & Tour Booking",
    liveUrl: "https://travel-tripora.vercel.app/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/lumen-roof-hero.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_041507_8e9c2d22-8be2-4652-8bbe-1f4556ea463a.png&w=1280&q=85",
    aspect: 1.658,
    tag: "06 / 3D & MOTION",
  },
  {
    caption: "National University Campus",
    category: "Unified Institutional Research",
    liveUrl: "https://fedralportal.oneapp.dev/",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/honey-bee-melli-landing.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261017_154537_1384fa6d-282d-46e2-8748-a70be1cf681a.png&w=1280&q=85",
    aspect: 1.330,
    tag: "07 / WEB PORTAL",
  },
  {
    caption: "Creative Engineering Lab",
    category: "WebGL Shaders & Physics Sandbox",
    liveUrl: "https://github.com/malikabubakkar523",
    videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/found-spider.mp4",
    posterUrl: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_020746_7eebb7cf-e21b-4288-8211-0cb9d0728f48.png&w=1280&q=85",
    aspect: 1.610,
    tag: "08 / CREATIVE TECH",
  },
];

// Card Vertex Shader
const CARD_VERTEX_SHADER = `
uniform float u_sheetW;
uniform float u_sheetD;
uniform float u_sheetT;
uniform float u_sheetC;
uniform float u_sheetP;
uniform float u_sheetV;
uniform float u_leanA;
uniform float u_leanW;
uniform float u_diag;
uniform float u_axis;
uniform float u_dent;
uniform float u_hover;
uniform vec2 u_res;

varying vec3 vWorldPos;
varying vec2 vUv;

const float PI = 3.141592653589793;
const float BANK = -0.16;
const float REAR_Y = 0.1;
const float REAR_Z = 0.2;
const float VTWIST = 1.8;
const float TAIL = 1.0;
const float SHIFT = -0.2;

void main() {
  vUv = uv;
  vec3 p = position;

  // 1. Hover dent: pushes vertex back in Z by hover * dent * resY * dome(uv)
  vec2 q_uv = 2.0 * uv - 1.0;
  float dome = (1.0 - q_uv.x * q_uv.x) * (1.0 - q_uv.y * q_uv.y);
  p.z -= u_hover * u_dent * u_res.y * dome;

  // 2. To world space
  vec4 worldPos = modelMatrix * vec4(p, 1.0);
  vec3 wp = worldPos.xyz;

  // 3. Phone axis swap (if phone, swap x and y)
  if (u_axis > 0.5) {
    float tmp = wp.x;
    wp.x = wp.y;
    wp.y = tmp;
  }

  float wx = wp.x;
  float W = u_sheetW;
  float D = u_sheetD;
  float T = u_sheetT;
  float C = u_sheetC;
  float V = u_sheetV;

  float q = (wx / W) * T + SHIFT;
  float q2 = q * q;
  float eTail = exp(-TAIL * q2);

  // shape(q) = mix(1 - q^2, sin(PI * q), C) * exp(-TAIL * q^2)
  float shapeVal = mix(1.0 - q2, sin(PI * q), C) * eTail;

  // shapeSlope(q)
  float bowlPrime = -2.0 * q * (1.0 + TAIL * (1.0 - q2));
  float essPrime = PI * cos(PI * q) - 2.0 * TAIL * q * sin(PI * q);
  float shapeSlope = mix(bowlPrime, essPrime, C) * exp(-q2);

  float rollAngle = BANK * (shapeSlope / PI) * C;

  // 4. Wind
  if (V > 0.0) {
    float normX = abs(wx / W);
    rollAngle += VTWIST * V * smoothstep(0.3, 0.9, normX) * sign(wx / W);
  }

  float cr = cos(rollAngle);
  float sr = sin(rollAngle);
  float py = wp.y * cr - wp.z * sr;
  float pz = wp.y * sr + wp.z * cr;
  wp.y = py;
  wp.z = pz;

  // 5. Bend
  wp.z -= D * shapeVal;

  // 6. Diagonal and rear lift
  wp.y += u_diag * wx;
  if (V > 0.0) {
    float m = 1.0 - smoothstep(-1.0, 0.3, wx / W);
    wp.y += REAR_Y * W * V * m;
    wp.z += REAR_Z * W * V * m;
  }

  // 7. Lean ("door")
  if (abs(u_leanW) > 0.001) {
    float s = clamp(wx / u_leanW, -1.0, 1.0);
    float ramp = s * (1.5 - 0.5 * s * s);
    wp.z += u_leanA * ramp;
  }

  // Swap back on phone
  if (u_axis > 0.5) {
    float tmp = wp.x;
    wp.x = wp.y;
    wp.y = tmp;
  }

  vWorldPos = wp;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`;

// Card Fragment Shader
const CARD_FRAGMENT_SHADER = `
uniform sampler2D u_mediaTex;
uniform sampler2D u_overlayTex;
uniform vec4 u_crop;
uniform float u_sheetD;
uniform float u_sheetW;
uniform float u_sheetT;
uniform float u_sheetC;
uniform float u_leanA;
uniform float u_leanW;
uniform float u_shade;
uniform float u_shadeS;
uniform float u_corner;
uniform float u_aspect;
uniform float u_alpha;
uniform float u_hover;

varying vec3 vWorldPos;
varying vec2 vUv;

const float PI = 3.141592653589793;
const float BANK = -0.16;
const float TAIL = 1.0;
const float SHIFT = -0.2;

void main() {
  // 1. Sample Media with Cover Crop
  vec2 mediaUv = u_crop.xy + vUv * u_crop.zw;
  vec4 mediaCol = texture2D(u_mediaTex, mediaUv);

  // Sample Canvas Overlay
  vec4 overlayCol = texture2D(u_overlayTex, vUv);

  // Composite: rgb = mix(media, overlay.rgb, overlay.a)
  vec3 rgb = mix(mediaCol.rgb, overlayCol.rgb, overlayCol.a);

  // 2. Subtle Depth Dimming (keeps cards vibrant, bright, and legible)
  float depth = clamp((u_sheetD - (-vWorldPos.z)) / (2.0 * max(u_sheetD, 0.001)), 0.0, 1.0);
  vec2 q_uv = 2.0 * vUv - 1.0;
  float dome = (1.0 - q_uv.x * q_uv.x) * (1.0 - q_uv.y * q_uv.y);
  depth = clamp(depth + u_hover * 0.15 * dome, 0.0, 1.0);
  rgb = mix(rgb, vec3(0.08), u_shade * 0.25 * depth);

  // 3. Lighting
  vec3 L = normalize(vec3(-0.4, 0.5, 1.0));
  vec3 Vdir = normalize(cameraPosition - vWorldPos);

  float wx = vWorldPos.x;
  float q = (wx / max(u_sheetW, 0.001)) * u_sheetT + SHIFT;
  float bowlPrime = -2.0 * q * (1.0 + TAIL * (1.0 - q * q));
  float essPrime = PI * cos(PI * q) - 2.0 * TAIL * q * sin(PI * q);
  float shapeSlope = mix(bowlPrime, essPrime, u_sheetC) * exp(-q * q);
  float dzdx = -u_sheetD * shapeSlope * (u_sheetT / max(u_sheetW, 0.001));

  if (abs(u_leanW) > 0.001) {
    float s = clamp(wx / u_leanW, -1.0, 1.0);
    float leanSlope = 1.5 * (1.0 - s * s);
    dzdx += (u_leanA / u_leanW) * leanSlope;
  }

  vec3 normal = normalize(vec3(-dzdx, 0.0, 1.0));
  float rollAngle = BANK * (shapeSlope / PI) * u_sheetC;
  float cr = cos(rollAngle);
  float sr = sin(rollAngle);
  vec3 N = normalize(vec3(normal.x, normal.y * cr - normal.z * sr, normal.y * sr + normal.z * cr));

  // Diffuse
  rgb *= 1.0 - 0.12 * (1.0 - (dot(N, L) * 0.5 + 0.5));

  // Specular sheen (Blinn-Phong)
  vec3 H = normalize(L + Vdir);
  float NdotH = max(dot(N, H), 0.0);
  float spec = pow(NdotH, 48.0) * 0.35;
  rgb += vec3(spec);

  // 4. Rounded corners via SDF in card space (aspect x 1)
  vec2 p_box = abs(vUv - 0.5) * vec2(u_aspect, 1.0);
  vec2 r_box = vec2(u_aspect, 1.0) * 0.5 - vec2(u_corner);
  vec2 d_box = p_box - r_box;
  float dist = length(max(d_box, 0.0)) + min(max(d_box.x, d_box.y), 0.0) - u_corner;
  float cornerAlpha = 1.0 - smoothstep(-fwidth(dist) * 0.5, fwidth(dist) * 0.5, dist);

  gl_FragColor = vec4(rgb, cornerAlpha * u_alpha);
}
`;

// Floor Vertex Shader
const FLOOR_VERTEX_SHADER = `
uniform float u_o;
uniform float u_leanA;
uniform float u_leanW;

varying float vFar;
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);

  // vFar = -worldZ / o
  vFar = -wp.z / max(u_o, 0.001);

  // Lean with ribbon
  if (abs(u_leanW) > 0.001) {
    float s = clamp(wp.x / u_leanW, -1.0, 1.0);
    float ramp = s * (1.5 - 0.5 * s * s);
    wp.z += u_leanA * ramp;
  }

  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

// Floor Fragment Shader
const FLOOR_FRAGMENT_SHADER = `
uniform float u_alpha;
uniform vec2 u_repeat;
uniform sampler2D u_reflTex;
uniform mat4 u_reflViewProj;
uniform float u_lightX;

varying float vFar;
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  float fade = 1.0 - smoothstep(0.2, 0.95, vFar);

  // Hairline perspective grid lines
  vec2 g = vec2(vUv.x * u_repeat.x, vFar * u_repeat.y);
  vec2 fw = fwidth(g);
  vec2 gridFract = abs(fract(g) - 0.5);
  float lineX = 1.0 - smoothstep(0.0, 1.5 * fw.x, gridFract.x);
  float lineY = 1.0 - smoothstep(0.0, 1.5 * fw.y, gridFract.y);
  float line = max(lineX, lineY);

  vec3 col = vec3(0.0, 0.0, 0.0);

  // Reflection on the lines
  vec4 reflCoord = u_reflViewProj * vec4(vWorldPos, 1.0);
  vec2 rUv = (reflCoord.xy / max(reflCoord.w, 0.0001)) * 0.5 + 0.5;

  // Spread from light
  rUv.x -= (vWorldPos.x - u_lightX) * 0.004 * abs(vFar);

  if (rUv.x >= 0.0 && rUv.x <= 1.0 && rUv.y >= 0.0 && rUv.y <= 1.0) {
    vec4 reflCol = texture2D(u_reflTex, rUv);
    float weight = vFar >= 0.0 ? exp(-6.0 * vFar) : exp(2.2 * vFar);
    float edges = smoothstep(0.0, 0.1, rUv.x) * smoothstep(1.0, 0.9, rUv.x) *
                  smoothstep(0.0, 0.1, rUv.y) * smoothstep(1.0, 0.9, rUv.y);
    col = mix(col, reflCol.rgb, 0.35 * weight * edges);
  }

  // Contact shadow
  float contactShadow = 1.0 - 0.55 * exp(-14.0 * abs(vFar));
  col *= contactShadow;

  // Soft lateral edge fade to constrain floor grid strictly to card width footprint
  float xFade = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);

  gl_FragColor = vec4(col, u_alpha * fade * line * xFade * 0.32);
}
`;

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [activeProject, setActiveProject] = useState(RIBBON_PROJECTS[0]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let destroyed = false;
    let animId = null;
    let isSectionVisible = true;
    let frameCount = 0;

    // Viewport & Design Units
    let vw = container.clientWidth || window.innerWidth;
    let vh = container.clientHeight || window.innerHeight;
    let isPhone = vw <= 649;
    let U = isPhone ? vw / 390 : vw / 1500;

    // Three.js Core Setup
    const scene = new THREE.Scene();
    // Transparent scene background allows rich CSS radial gradient stage and smooth edge blends
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(53.4, vw / vh, 0.1, 2000);
    camera.position.set(0, 0, 41.18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(vw, vh);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    // Half-height & width of z=0 plane
    const H = Math.tan(((53.4 * Math.PI) / 180) / 2) * 41.18; // approx 20.71
    let W = H * (vw / vh);
    let k = (2 * H) / vh;

    // Reflection Camera & Target (Half Resolution)
    const reflTarget = new THREE.WebGLRenderTarget(
      Math.floor(vw / 2),
      Math.floor(vh / 2),
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      }
    );
    const reflCamera = camera.clone();

    // Virtual Scroll Physics State
    let target = 100;
    let current = target;
    let pending = 0;
    let lastTime = performance.now();
    let lastEventTime = 0;
    let hoveredCardIndex = -1;

    // Drag Tracking State
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastMoveTime = 0;
    let dragDistance = 0;

    // Layout Data for 8 Cards
    let loopL = 0;
    let loopLeft = 0;
    let loopTop = 0;
    let cardH = 0;

    const cards = [];
    const cardGeom = new THREE.PlaneGeometry(1, 1, 96, 24);

    // Helper: Paint Crisp 2D Canvas Overlay with Title, Number, and Button
    function createOverlayTexture(cardData, w, h, uVal, onPhone) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const s = (2 * dpr) / 1.5;
      const cvs = document.createElement("canvas");
      cvs.width = Math.max(1, Math.floor(w * s));
      cvs.height = Math.max(1, Math.floor(h * s));
      const ctx = cvs.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(cvs);

      ctx.scale(s, s);

      // Bottom subtle vignette so white text always pops with maximum legibility
      const grad = ctx.createLinearGradient(0, h * 0.6, 0, h);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.0)");
      grad.addColorStop(0.4, "rgba(0, 0, 0, 0.45)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0.88)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, h * 0.6, w, h * 0.4);

      // Insets
      const insetLeft = onPhone ? 14 * uVal : 28 * uVal;
      const insetRight = onPhone ? 14 * uVal : 28 * uVal;
      const insetBottom = onPhone ? 16 * uVal : 22 * uVal;

      // 1. Tag / Category
      ctx.font = `600 ${Math.max(10, 11 * uVal)}px "Inter Tight", sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
      ctx.shadowBlur = 10 * uVal;
      ctx.fillText(cardData.tag.toUpperCase(), insetLeft, h - insetBottom - (24 * uVal));

      // 2. Project Title
      const fontSize = onPhone ? 17 * uVal : 22 * uVal;
      ctx.font = `600 ${fontSize}px "Inter Tight", sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
      ctx.shadowBlur = 14 * uVal;
      ctx.fillText(cardData.caption, insetLeft, h - insetBottom);

      // 3. Interactive Pill Button
      const btnRadius = 12.5 * uVal;
      const btnCenterX = w - insetRight - btnRadius;
      const btnCenterY = h - insetBottom - (btnRadius * 0.4);

      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 8 * uVal;
      ctx.beginPath();
      ctx.arc(btnCenterX, btnCenterY, btnRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      // White Icon Stroke
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.4 * uVal;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const a = 4.5 * uVal;

      ctx.beginPath();
      if (!onPhone) {
        // Desktop "+" icon
        ctx.moveTo(btnCenterX - a, btnCenterY);
        ctx.lineTo(btnCenterX + a, btnCenterY);
        ctx.moveTo(btnCenterX, btnCenterY - a);
        ctx.lineTo(btnCenterX, btnCenterY + a);
      } else {
        // Phone "→" arrow
        ctx.moveTo(btnCenterX - a, btnCenterY);
        ctx.lineTo(btnCenterX + a, btnCenterY);
        ctx.moveTo(btnCenterX + 0.2 * a, btnCenterY - 0.8 * a);
        ctx.lineTo(btnCenterX + a, btnCenterY);
        ctx.lineTo(btnCenterX + 0.2 * a, btnCenterY + 0.8 * a);
      }
      ctx.stroke();

      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      return tex;
    }

    // Initialize 8 Cards
    RIBBON_PROJECTS.forEach((item, index) => {
      // 1. Poster Texture
      const imgLoader = new THREE.TextureLoader();
      imgLoader.crossOrigin = "anonymous";
      const posterTex = imgLoader.load(item.posterUrl, () => {
        posterTex.colorSpace = THREE.SRGBColorSpace;
        posterTex.minFilter = THREE.LinearMipmapLinearFilter;
        posterTex.magFilter = THREE.LinearFilter;
        posterTex.generateMipmaps = true;
        mat.uniforms.u_mediaTex.value = posterTex;
      });

      // 2. Video Texture (Streaming WebGL - Lazy Loaded to maximize performance)
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.preload = "none";

      let videoTex = null;
      let hasSwappedVideo = false;

      const swapVideo = () => {
        if (hasSwappedVideo || destroyed) return;
        hasSwappedVideo = true;
        videoTex = new THREE.VideoTexture(video);
        videoTex.colorSpace = THREE.SRGBColorSpace;
        videoTex.minFilter = THREE.LinearFilter;
        videoTex.magFilter = THREE.LinearFilter;
        mat.uniforms.u_mediaTex.value = videoTex;
      };

      if ("requestVideoFrameCallback" in video) {
        video.requestVideoFrameCallback(() => swapVideo());
      } else {
        video.addEventListener("playing", () => swapVideo(), { once: true });
      }

      // 3. Shader Material
      const mat = new THREE.ShaderMaterial({
        vertexShader: CARD_VERTEX_SHADER,
        fragmentShader: CARD_FRAGMENT_SHADER,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        frustumCulled: false,
        uniforms: {
          u_sheetW: { value: W },
          u_sheetD: { value: 6.63 },
          u_sheetT: { value: 1.15 },
          u_sheetC: { value: 1.0 },
          u_sheetP: { value: 1.0 },
          u_sheetV: { value: 0.0 },
          u_leanA: { value: -0.12 * W },
          u_leanW: { value: W },
          u_diag: { value: 0.03 },
          u_axis: { value: 0.0 },
          u_dent: { value: 0.035 },
          u_hover: { value: 0.0 },
          u_res: { value: new THREE.Vector2(1, 1) },
          u_crop: { value: new THREE.Vector4(0, 0, 1, 1) },
          u_mediaTex: { value: posterTex },
          u_overlayTex: { value: new THREE.Texture() },
          u_shade: { value: 1.0 },
          u_shadeS: { value: 1.0 },
          u_corner: { value: 0.05 },
          u_aspect: { value: item.aspect },
          u_alpha: { value: 0.0 },
        },
      });

      const mesh = new THREE.Mesh(cardGeom, mat);
      scene.add(mesh);

      cards.push({
        data: item,
        index,
        mesh,
        material: mat,
        video,
        hasLoadedVideo: false,
        overlayTex: null,
        width: 0,
        height: 0,
        baseX: 0,
        baseY: 0,
        hoverVal: 0,
        alphaVal: 0,
      });
    });

    // Perspective Floor
    const floorGeom = new THREE.PlaneGeometry(1, 1, 48, 24);
    floorGeom.rotateX(-Math.PI / 2);

    const floorMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERTEX_SHADER,
      fragmentShader: FLOOR_FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        u_alpha: { value: 0.0 },
        u_o: { value: 6 * H },
        u_leanA: { value: -0.12 * W },
        u_leanW: { value: W },
        u_repeat: { value: new THREE.Vector2(10, 10) },
        u_reflTex: { value: reflTarget.texture },
        u_reflViewProj: { value: new THREE.Matrix4() },
        u_lightX: { value: -0.6 * W },
      },
    });

    const floorMesh = new THREE.Mesh(floorGeom, floorMat);
    floorMesh.renderOrder = -1;
    scene.add(floorMesh);

    // Layout Calculations
    function computeLayout() {
      vw = container.clientWidth || window.innerWidth;
      vh = container.clientHeight || window.innerHeight;
      isPhone = vw <= 649;
      U = isPhone ? vw / 390 : vw / 1500;

      renderer.setSize(vw, vh);
      reflTarget.setSize(Math.floor(vw / 2), Math.floor(vh / 2));

      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();

      reflCamera.aspect = camera.aspect;
      reflCamera.updateProjectionMatrix();

      W = H * camera.aspect;
      k = (2 * H) / vh;

      const gap = isPhone ? 14 * U : 10 * U;
      let runningOffset = 0;

      // Unify horizontal ribbon layout for BOTH Desktop and Mobile view
      cardH = isPhone ? Math.min(0.38 * vh, 230) : Math.min(0.435 * vh, 550 * U);

      cards.forEach((card) => {
        card.height = cardH;
        card.width = cardH * card.data.aspect;
        card.baseX = runningOffset;
        runningOffset += card.width + gap;

        // Cover crop
        const ma = 1600 / 900;
        const a = card.data.aspect;
        let scaleX = 1;
        let scaleY = 1;
        if (a > ma) {
          scaleY = ma / a;
        } else {
          scaleX = a / ma;
        }
        const offX = (1 - scaleX) / 2;
        const offY = (1 - scaleY) / 2;
        card.material.uniforms.u_crop.value.set(offX, offY, scaleX, scaleY);
        card.material.uniforms.u_aspect.value = a;
        card.material.uniforms.u_corner.value = (isPhone ? 16 * U : 20 * U) / cardH;
        card.material.uniforms.u_axis.value = 0.0; // Horizontal on both PC and mobile!
        card.material.uniforms.u_shade.value = 0.0; // Keep cards bright, vivid and clear
        card.material.uniforms.u_shadeS.value = 1.0;

        // Paint Canvas Overlay
        if (card.overlayTex) card.overlayTex.dispose();
        card.overlayTex = createOverlayTexture(card.data, card.width, card.height, U, isPhone);
        card.material.uniforms.u_overlayTex.value = card.overlayTex;
      });

      loopL = runningOffset;
      loopLeft = -(loopL - vw) / 2;

      // Floor Placement & Reflection - Constrained cleanly to ribbon cards footprint
      floorMesh.visible = true;
      const aFloor = -cardH * k * 0.5 - 0.06 * H;
      const oFloor = 4.2 * H;
      const nearFloor = Math.min(41.18 * (1 - Math.abs(aFloor) / H) + 0.2 * H, 41.18 * 0.8);
      floorMesh.scale.set(W * 2.4, 1, nearFloor + oFloor);
      floorMesh.position.set(0, aFloor, (nearFloor - oFloor) / 2);

      const cellSize = 0.22 * H;
      floorMat.uniforms.u_repeat.value.set((W * 2.4) / cellSize, oFloor / cellSize);
      floorMat.uniforms.u_o.value = oFloor;
      floorMat.uniforms.u_leanA.value = -0.12 * W;
      floorMat.uniforms.u_leanW.value = W;
      floorMat.uniforms.u_lightX.value = -0.6 * W;

      // Mirrored Camera for Reflection
      const mFloor = aFloor - 0.07 * H;
      reflCamera.position.set(0, 2 * mFloor - camera.position.y, camera.position.z);
      reflCamera.lookAt(0, 2 * mFloor, 0);
    }

    computeLayout();
    setIsReady(true);

    // Event Handlers for Virtual Scroll & Inertia
    const handleWheel = (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();

      let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= vh;

      const now = performance.now();
      const dtEvent = now - lastEventTime;
      lastEventTime = now;

      // Big flick detection
      if (Math.abs(delta) >= 40 && dtEvent >= 30) {
        pending += delta * 1.25 * 2;
      } else {
        target += delta * 1.25;
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastMoveTime = performance.now();
      dragDistance = 0;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (isDragging) {
        const dx = lastPointerX - clientX;
        const dy = lastPointerY - clientY;
        const moveDist = Math.hypot(clientX - dragStartX, clientY - dragStartY);
        dragDistance = moveDist;

        // Horizontal drag swipe for both Desktop and Mobile!
        target += dx * 1.4;

        lastPointerX = clientX;
        lastPointerY = clientY;
        lastMoveTime = performance.now();
      }

      // Hover Picking on Desktop
      if (!isPhone && !isDragging) {
        const ndcX = ((clientX - rect.left) / vw) * 2 - 1;
        const ndcY = -(((clientY - rect.top) / vh) * 2 - 1);

        // Approximate card bounding check
        let foundHover = -1;
        cards.forEach((card, idx) => {
          if (!card.screenRect) return;
          const { x, y, w, h } = card.screenRect;
          if (
            clientX >= x - 20 &&
            clientX <= x + w + 20 &&
            clientY >= y - 20 &&
            clientY <= y + h + 20
          ) {
            foundHover = idx;
          }
        });

        hoveredCardIndex = foundHover;
        canvas.style.cursor = foundHover !== -1 ? "pointer" : "default";
      }
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);

      const dtPointer = Math.max(16, performance.now() - lastMoveTime);
      const deltaX = dragStartX - e.clientX;
      const deltaY = dragStartY - e.clientY;

      // Fling momentum on touch/drag
      if (dtPointer < 150) {
        const fling = deltaX * 0.45;
        target += fling;
      }

      // If it was a clean click without dragging, open project link!
      if (dragDistance < 6) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX;
        const clickY = e.clientY;

        cards.forEach((card) => {
          if (!card.screenRect) return;
          const { x, y, w, h } = card.screenRect;
          if (
            clickX >= x &&
            clickX <= x + w &&
            clickY >= y &&
            clickY <= y + h
          ) {
            setActiveProject(card.data);
            if (card.data.liveUrl) {
              window.open(card.data.liveUrl, "_blank", "noopener,noreferrer");
            }
          }
        });
      }
    };

    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let handled = true;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        target += 100;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        target -= 100;
      } else if (e.key === "PageDown") {
        target += 0.9 * vh;
      } else if (e.key === "PageUp") {
        target -= 0.9 * vh;
      } else if (e.key === " ") {
        target += (e.shiftKey ? -0.9 : 0.9) * vh;
      } else {
        handled = false;
      }
      if (handled) e.preventDefault();
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("keydown", handleKeyDown);

    // Resize Handler
    let resizeTimer = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!destroyed) computeLayout();
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Section Visibility Observer (Saves ~90% GPU and CPU when offscreen)
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
        if (!entry.isIntersecting) {
          cards.forEach((card) => {
            if (!card.video.paused) card.video.pause();
          });
        }
      },
      { threshold: 0.02 }
    );
    sectionObserver.observe(container);

    // Animation Frame Loop
    const animate = (timestamp) => {
      if (destroyed) return;

      // When section is scrolled off-screen, completely pause rendering loop to keep entire site blazing fast
      if (!isSectionVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;

      // 1. Flush pending wheel pool
      if (Math.abs(pending) > 0.05) {
        const ease = 1 - Math.pow(1 - 0.22, Math.min(dt * 60, 4));
        const deltaEase = pending * ease;
        target += deltaEase;
        pending -= deltaEase;
      } else if (pending !== 0) {
        target += pending;
        pending = 0;
      }

      // 2. Soft-clamp lag to one viewport width
      target = current + Math.tanh((target - current) / vw) * vw;

      // 3. Smooth current interpolation
      const ratio = Math.min(dt * 60, 2);
      current += (target - current) * 0.1 * ratio;

      // 4. Velocity computation
      const N = isPhone ? 320 : 550;
      const tVal = Math.tanh((target - current) / N);
      const vel = tVal * Math.abs(tVal);
      const r = Math.min(1, Math.abs(vel));

      // 5. Bend Depth & Velocity Uniforms (Horizontal S-Curve Ribbon for all screens)
      const D = W * 0.2 * (1 + 1.1 * r);
      const V = r;

      // Floor alpha fade-in
      floorMat.uniforms.u_alpha.value = THREE.MathUtils.lerp(
        floorMat.uniforms.u_alpha.value,
        0.9,
        dt * 1.5
      );

      // 6. Cards Placement along the Horizontal Ribbon
      cards.forEach((card, idx) => {
        // Fade in alpha
        card.alphaVal = THREE.MathUtils.lerp(card.alphaVal, 1.0, dt * 2.5);
        card.material.uniforms.u_alpha.value = card.alphaVal;

        // Hover ease
        const isHov = hoveredCardIndex === idx;
        const targetHov = isHov ? 1.0 : 0.0;
        card.hoverVal = THREE.MathUtils.lerp(
          card.hoverVal,
          targetHov,
          isHov ? 1 - Math.exp(-8 * dt) : 1 - Math.exp(-6 * dt)
        );
        card.material.uniforms.u_hover.value = card.hoverVal;

        // Sync sheet uniforms
        card.material.uniforms.u_sheetW.value = W;
        card.material.uniforms.u_sheetD.value = D;
        card.material.uniforms.u_sheetV.value = V;
        card.material.uniforms.u_leanA.value = -0.12 * W;
        card.material.uniforms.u_leanW.value = W;

        // Horizontal seamless wrapping for both Desktop and Mobile!
        let x = card.baseX - current;
        const shifted = x - loopLeft;
        x = ((((shifted % loopL) + loopL) % loopL) + loopLeft);

        const screenX = x;
        const screenY = (vh - card.height) / 2;

        // Convert to world space
        const worldX = (screenX + card.width / 2 - vw / 2) * k;
        const worldY = -(screenY + card.height / 2 - vh / 2) * k;
        card.mesh.position.set(worldX, worldY, 0);
        card.mesh.scale.set(card.width * k, card.height * k, 1);
        card.material.uniforms.u_res.value.set(card.width * k, card.height * k);

        // Video playback manager: only play near viewport and lazy-load src on demand
        const isNear = screenX + card.width > -0.5 * vw && screenX < 1.5 * vw;
        if (isNear && !document.hidden && isSectionVisible) {
          if (!card.hasLoadedVideo) {
            card.hasLoadedVideo = true;
            card.video.src = card.data.videoUrl;
            card.video.load();
          }
          if (card.video.paused) card.video.play().catch(() => {});
        } else {
          if (!card.video.paused) card.video.pause();
        }

        card.screenRect = { x: screenX, y: screenY, w: card.width, h: card.height };
      });

      // 7. Reflection Pass (Desktop only, throttled when moving to maximize FPS)
      frameCount++;
      const shouldReflect = !isPhone && floorMesh.visible && (
        Math.abs(vel) > 0.0005 || isDragging || Math.abs(pending) > 0.01 || frameCount % 3 === 0
      );
      if (shouldReflect) {
        floorMesh.visible = false;
        renderer.setRenderTarget(reflTarget);
        renderer.clear();
        renderer.render(scene, reflCamera);
        renderer.setRenderTarget(null);
        floorMesh.visible = true;

        // Pass reflection ViewProjection matrix
        const reflViewProj = new THREE.Matrix4();
        reflViewProj.multiplyMatrices(reflCamera.projectionMatrix, reflCamera.matrixWorldInverse);
        floorMat.uniforms.u_reflViewProj.value.copy(reflViewProj);
      }

      // 8. Main Render Pass
      renderer.render(scene, camera);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      destroyed = true;
      if (animId) cancelAnimationFrame(animId);
      if (resizeTimer) clearTimeout(resizeTimer);
      sectionObserver.disconnect();

      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);

      cards.forEach((card) => {
        card.video.pause();
        card.video.src = "";
        if (card.overlayTex) card.overlayTex.dispose();
        card.material.dispose();
      });
      cardGeom.dispose();
      floorGeom.dispose();
      floorMat.dispose();
      reflTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#FAF8F5] text-neutral-900 select-none"
    >
      {/* Three.js Full-Viewport WebGL Canvas */}
      <canvas
        ref={canvasRef}
        id="gl"
        className="absolute inset-0 w-full h-full block z-10 touch-none"
        aria-hidden="true"
      />

      {/* Screen-reader list (§2 Accessibility Spec) */}
      <main className="sr-only" id="list" aria-label="Featured work">
        {RIBBON_PROJECTS.map((item) => (
          <article key={item.caption}>
            <h2>{item.caption}</h2>
            <p>{item.category}</p>
            <a href={item.liveUrl} target="_blank" rel="noreferrer">
              Live Project: {item.liveUrl}
            </a>
          </article>
        ))}
      </main>

      {/* Minimal Corner HUD & Navigation Elements */}
      <nav
        className="ui absolute inset-0 z-30 pointer-events-none p-4 sm:p-8 flex flex-col justify-between font-hn"
        aria-label="Ribbon Navigation"
      >
        {/* Top Transition Header: Clean & Elegant Gallery Title (Removed Pill Buttons) */}
        <div className="flex flex-col items-center justify-center text-center mx-auto pointer-events-none select-none pt-2 sm:pt-4">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#BA9B70] font-semibold mb-1">
            SELECTED WORKS · 3D RIBBON
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#121214] uppercase">
            FEATURED PROJECTS
          </h2>
        </div>

        {/* Bottom Bar: Instructions & Live Project Pill Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
          <div className="hidden sm:flex flex-col gap-1 pointer-events-auto max-w-xs px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-300/80 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Interactive Stage
            </span>
            <span className="text-xs text-neutral-700">
              Virtual smooth inertia, velocity bend & mirror reflection
            </span>
          </div>

          {activeProject && (
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#121214] text-white hover:bg-neutral-800 text-[11px] sm:text-xs font-semibold tracking-wide transition-all transform hover:scale-105 shadow-md cursor-pointer self-end sm:self-auto"
            >
              <span>View {activeProject.caption} Live</span>
              <span className="text-sm font-mono">↗</span>
            </a>
          )}
        </div>
      </nav>

      {/* Loader: Three Dashes (§2 Loader Spec) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center gap-1.5 pointer-events-none transition-opacity duration-700 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <i className="inline-block h-0.5 w-11 bg-neutral-800 animate-pulse" />
        <i
          className="inline-block h-0.5 w-11 bg-neutral-800 animate-pulse"
          style={{ animationDelay: "120ms" }}
        />
        <i
          className="inline-block h-0.5 w-9 bg-neutral-800 animate-pulse"
          style={{ animationDelay: "240ms" }}
        />
      </div>
    </section>
  );
}
