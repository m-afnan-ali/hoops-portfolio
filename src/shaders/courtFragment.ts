export const courtFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // FBM (fractal brownian motion) for richer smoke
  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      f += amp * snoise(p);
      p *= 2.1;
      amp *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uvAspect = uv * aspect;
    float t = uTime;

    // === ASPHALT BASE ===
    float asphalt1 = snoise(uv * 30.0) * 0.5 + 0.5;
    float asphalt2 = snoise(uv * 60.0 + 50.0) * 0.5 + 0.5;
    float asphalt3 = snoise(uv * 120.0 + 100.0) * 0.5 + 0.5;
    float asphaltTex = asphalt1 * 0.5 + asphalt2 * 0.3 + asphalt3 * 0.2;
    vec3 baseColor = mix(vec3(0.02, 0.02, 0.022), vec3(0.06, 0.055, 0.05), asphaltTex * 0.6);

    // === DRIFTING SMOKE / FOG ===
    vec2 smokeUV1 = uvAspect * 1.5 + vec2(t * 0.03, t * 0.02);
    vec2 smokeUV2 = uvAspect * 2.2 + vec2(-t * 0.02, t * 0.015);
    vec2 smokeUV3 = uvAspect * 0.8 + vec2(t * 0.01, -t * 0.025);
    float smoke1 = fbm(smokeUV1) * 0.5 + 0.5;
    float smoke2 = fbm(smokeUV2) * 0.5 + 0.5;
    float smoke3 = fbm(smokeUV3) * 0.5 + 0.5;
    float smokeCombined = smoke1 * 0.45 + smoke2 * 0.35 + smoke3 * 0.2;

    // Smoke adds visible grey wisps
    vec3 smokeColor = vec3(0.12, 0.11, 0.10);
    baseColor = mix(baseColor, smokeColor, smokeCombined * 0.35);

    // === NEON ORANGE LIGHT BLEEDS ===
    // Two moving light sources that drift slowly
    vec2 light1Pos = vec2(
      0.3 + sin(t * 0.15) * 0.25,
      0.4 + cos(t * 0.12) * 0.3
    );
    vec2 light2Pos = vec2(
      0.7 + cos(t * 0.1) * 0.2,
      0.6 + sin(t * 0.18) * 0.25
    );

    float light1Dist = length((uv - light1Pos) * aspect);
    float light2Dist = length((uv - light2Pos) * aspect);

    // Soft falloff glow
    float light1 = 0.04 / (light1Dist * light1Dist + 0.08);
    float light2 = 0.03 / (light2Dist * light2Dist + 0.1);

    // Modulate with smoke for volumetric feel
    light1 *= (0.6 + smoke1 * 0.4);
    light2 *= (0.6 + smoke2 * 0.4);

    vec3 neonOrange = vec3(1.0, 0.34, 0.2);    // #FF5733
    vec3 neonDeep   = vec3(0.9, 0.15, 0.05);   // deeper red-orange

    baseColor += neonOrange * light1 * 0.12;
    baseColor += neonDeep * light2 * 0.08;

    // Pulsing ambient neon wash
    float pulse = sin(t * 0.4) * 0.5 + 0.5;
    baseColor += neonOrange * pulse * 0.008;

    // === MOUSE REACTIVE GLOW ===
    vec2 mouseUV = uMouse;
    float mouseDist = length((uv - mouseUV) * aspect);
    float mouseGlow = 0.015 / (mouseDist * mouseDist + 0.05);
    mouseGlow *= (0.7 + smoke1 * 0.3);
    baseColor += neonOrange * mouseGlow * 0.06;

    // === FAINT COURT LINES ===
    // Center circle
    float centerDist = length((uv - vec2(0.5, 0.5)) * aspect);
    float circle = smoothstep(0.002, 0.0, abs(centerDist - 0.18));
    baseColor += vec3(1.0, 0.5, 0.3) * circle * 0.04 * (0.5 + smoke1 * 0.5);

    // Half-court line
    float halfLine = smoothstep(0.002, 0.0, abs(uv.x - 0.5));
    baseColor += vec3(1.0, 0.5, 0.3) * halfLine * 0.03 * (0.4 + smoke2 * 0.6);

    // Free throw lines
    float ftLine1 = smoothstep(0.002, 0.0, abs(uv.y - 0.3)) * step(0.15, uv.x) * step(uv.x, 0.35);
    float ftLine2 = smoothstep(0.002, 0.0, abs(uv.y - 0.7)) * step(0.65, uv.x) * step(uv.x, 0.85);
    baseColor += vec3(1.0, 0.5, 0.3) * (ftLine1 + ftLine2) * 0.025;

    // === FILM GRAIN ===
    float grain = snoise(uv * 300.0 + t * 3.0) * 0.03;
    baseColor += grain;

    // === VIGNETTE ===
    float vignette = 1.0 - length(uv - 0.5) * 1.0;
    vignette = smoothstep(0.0, 0.7, vignette);
    baseColor *= vignette;

    // Clamp to prevent overbright
    baseColor = clamp(baseColor, 0.0, 1.0);

    gl_FragColor = vec4(baseColor, 1.0);
  }
`

export const courtVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
