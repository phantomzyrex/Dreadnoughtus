import {
  COMPLETENESS_CHART_DATA,
  CompletenessEntry,
  SIZE_COMPARISON_ENTITIES,
  SizeComparisonEntity,
} from '../data/dreadnoughtusData';

export interface WaterLevelState {
  stage: 'LOW WATER' | 'BANKFULL' | 'FLOOD';
  percentage: number;
  rainIntensity: number;
  mistOpacity: number;
}

/**
 * Pure calculation mapping normalized scroll progress [0..1] to floodplain water gauge state
 */
export function getWaterLevelStage(scrollProgress: number): WaterLevelState {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(scrollProgress) ? scrollProgress : 0));
  const percentage = Math.round(clamped * 100);

  let stage: 'LOW WATER' | 'BANKFULL' | 'FLOOD' = 'LOW WATER';
  if (clamped >= 0.66) {
    stage = 'FLOOD';
  } else if (clamped >= 0.33) {
    stage = 'BANKFULL';
  }

  // Rain intensity and mist opacity gently increase as you scroll downstream into the flood
  const rainIntensity = Number((0.12 + clamped * 0.13).toFixed(3));
  const mistOpacity = Number((0.1 + clamped * 0.12).toFixed(3));

  return {
    stage,
    percentage,
    rainIntensity,
    mistOpacity,
  };
}

/**
 * Filters and computes normalized horizontal scale percentages for the Size Comparison chart
 */
export function getSizeComparisonList(
  includeOtherGiants: boolean
): Array<SizeComparisonEntity & { widthPercent: number }> {
  const list = SIZE_COMPARISON_ENTITIES.filter(
    (item) => includeOtherGiants || !item.isOptionalGiant
  );
  const maxLen = Math.max(...list.map((i) => i.lengthMeters), 30);

  return list.map((item) => ({
    ...item,
    widthPercent: Number(((item.lengthMeters / maxLen) * 100).toFixed(2)),
  }));
}

/**
 * Computes mouse parallax translation offsets within strict pixel caps
 */
export function calculateParallaxOffset(
  normalizedX: number,
  normalizedY: number,
  maxShiftPx: number,
  invert = false
): { x: number; y: number } {
  const nx = Math.max(-1, Math.min(1, Number.isFinite(normalizedX) ? normalizedX : 0));
  const ny = Math.max(-1, Math.min(1, Number.isFinite(normalizedY) ? normalizedY : 0));
  const sign = invert ? -1 : 1;

  return {
    x: Number((nx * maxShiftPx * sign).toFixed(2)),
    y: Number((ny * (maxShiftPx * 0.45) * sign).toFixed(2)),
  };
}

/**
 * Sorts completeness comparison records by either total skeletal completeness or bone types preserved
 */
export function getSortedCompletenessData(
  metric: 'totalSkeletalPercent' | 'boneTypesExclSkullPercent'
): CompletenessEntry[] {
  return [...COMPLETENESS_CHART_DATA].sort((a, b) => b[metric] - a[metric]);
}

/**
 * Maps a mass value in tonnes onto a [0..100]% horizontal axis for the dot-and-whisker chart
 */
export function getMassAxisPercent(tonnes: number, minAxis = 15, maxAxis = 65): number {
  const clamped = Math.max(minAxis, Math.min(maxAxis, tonnes));
  return Number((((clamped - minAxis) / (maxAxis - minAxis)) * 100).toFixed(2));
}
