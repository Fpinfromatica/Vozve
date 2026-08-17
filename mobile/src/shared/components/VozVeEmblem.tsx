import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Polygon, Line, Circle, G } from 'react-native-svg';

interface VozVeEmblemProps {
  width?: number;
  height?: number;
}

export const VozVeEmblem: React.FC<VozVeEmblemProps> = ({ width = 230, height = 290 }) => {
  return (
    <View className="items-center justify-center">
      <Svg width={width} height={height} viewBox="0 0 240 320">
        <Defs>
          {/* Degradados Dorados 3D */}
          <LinearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="25%" stopColor="#FFF2A3" />
            <Stop offset="50%" stopColor="#EAB308" />
            <Stop offset="85%" stopColor="#A16207" />
            <Stop offset="100%" stopColor="#451A03" />
          </LinearGradient>

          <LinearGradient id="goldDark" x1="100%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FEF08A" />
            <Stop offset="40%" stopColor="#CA8A04" />
            <Stop offset="70%" stopColor="#854D0E" />
            <Stop offset="100%" stopColor="#2E1065" />
          </LinearGradient>

          {/* Degradados Bandera Tricolor */}
          <LinearGradient id="flagYellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FDE047" />
            <Stop offset="100%" stopColor="#EAB308" />
          </LinearGradient>

          <LinearGradient id="flagBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#1E40AF" />
            <Stop offset="100%" stopColor="#0F172A" />
          </LinearGradient>

          <LinearGradient id="flagRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#EF4444" />
            <Stop offset="100%" stopColor="#7F1D1D" />
          </LinearGradient>

          {/* Resplandor Estrella */}
          <RadialGradient id="starGlow" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <Stop offset="50%" stopColor="#F59E0B" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 1. Destellos Luminosos */}
        <G x={120} y={85}>
          <Circle cx={0} cy={0} r={70} fill="url(#starGlow)" />
          <Line x1={0} y1={-80} x2={0} y2={80} stroke="#FFFBEB" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
          <Line x1={-80} y1={0} x2={80} y2={0} stroke="#FFFBEB" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
          <Line x1={-55} y1={-55} x2={55} y2={55} stroke="#FDE68A" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
          <Line x1={-55} y1={55} x2={55} y2={-55} stroke="#FDE68A" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        </G>

        {/* 2. Escudo 'V' Dorado */}
        <G id="v-shield">
          <Polygon points="30,85 120,290 120,240 68,105" fill="url(#goldDark)" />
          <Polygon points="30,85 68,105 120,240 120,255" fill="url(#goldLight)" opacity={0.9} />
          <Polygon points="210,85 120,290 120,240 172,105" fill="url(#goldLight)" />
          <Polygon points="210,85 172,105 120,240 120,255" fill="url(#goldDark)" opacity={0.9} />
        </G>

        {/* 3. Tricolor en el Centro */}
        <G id="tricolor">
          <Polygon points="75,115 165,115 152,145 88,145" fill="url(#flagYellow)" />
          <Polygon points="88,145 152,145 138,195 102,195" fill="url(#flagBlue)" />
          <Polygon points="102,195 138,195 120,245" fill="url(#flagRed)" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = -145 + i * (110 / 7);
            const rad = (angle * Math.PI) / 180;
            const cx = 120 + 26 * Math.cos(rad);
            const cy = 180 + 16 * Math.sin(rad);
            return <Circle key={i} cx={cx} cy={cy} r={1.8} fill="#FFFFFF" />;
          })}
        </G>

        {/* 4. Estrella de 8 Puntas Superior */}
        <G x={120} y={85}>
          <Polygon points="0,-48 0,0 12,-12" fill="url(#goldDark)" />
          <Polygon points="0,-48 0,0 -12,-12" fill="url(#goldLight)" />
          <Polygon points="0,48 0,0 -12,12" fill="url(#goldDark)" />
          <Polygon points="0,48 0,0 12,12" fill="url(#goldLight)" />
          <Polygon points="48,0 0,0 12,-12" fill="url(#goldLight)" />
          <Polygon points="48,0 0,0 12,12" fill="url(#goldDark)" />
          <Polygon points="-48,0 0,0 -12,12" fill="url(#goldLight)" />
          <Polygon points="-48,0 0,0 -12,-12" fill="url(#goldDark)" />

          <Polygon points="32,-32 0,0 0,-16" fill="url(#goldLight)" />
          <Polygon points="32,-32 0,0 16,0" fill="url(#goldDark)" />
          <Polygon points="32,32 0,0 16,0" fill="url(#goldLight)" />
          <Polygon points="32,32 0,0 0,16" fill="url(#goldDark)" />
          <Polygon points="-32,32 0,0 0,16" fill="url(#goldLight)" />
          <Polygon points="-32,32 0,0 -16,0" fill="url(#goldDark)" />
          <Polygon points="-32,-32 0,0 -16,0" fill="url(#goldLight)" />
          <Polygon points="-32,-32 0,0 0,-16" fill="url(#goldDark)" />

          <Polygon points="0,-8 8,0 0,8 -8,0" fill="#FFFFFF" />
        </G>
      </Svg>
    </View>
  );
};