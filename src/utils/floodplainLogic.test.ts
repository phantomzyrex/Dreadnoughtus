import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getWaterLevelStage,
  getSizeComparisonList,
  calculateParallaxOffset,
  getSortedCompletenessData,
  getMassAxisPercent,
} from './floodplainLogic';

test('getWaterLevelStage transitions accurately from LOW WATER to BANKFULL to FLOOD', () => {
  const low = getWaterLevelStage(0.1);
  assert.equal(low.stage, 'LOW WATER');
  assert.equal(low.percentage, 10);

  const bankfull = getWaterLevelStage(0.5);
  assert.equal(bankfull.stage, 'BANKFULL');
  assert.equal(bankfull.percentage, 50);

  const flood = getWaterLevelStage(0.85);
  assert.equal(flood.stage, 'FLOOD');
  assert.equal(flood.percentage, 85);
  assert.ok(flood.rainIntensity > low.rainIntensity);
});

test('getSizeComparisonList toggles Patagotitan and Argentinosaurus and scales widths', () => {
  const baseList = getSizeComparisonList(false);
  assert.equal(baseList.length, 6);
  assert.equal(baseList.some((i) => i.id === 'patagotitan'), false);

  const expandedList = getSizeComparisonList(true);
  assert.equal(expandedList.length, 8);
  assert.equal(expandedList.some((i) => i.id === 'patagotitan'), true);
  assert.equal(expandedList.some((i) => i.id === 'argentinosaurus'), true);

  const longest = expandedList.find((i) => i.id === 'patagotitan')!;
  assert.equal(longest.widthPercent, 100);
});

test('calculateParallaxOffset respects maxShiftPx and invert flag', () => {
  const wordmarkShift = calculateParallaxOffset(0.5, -0.5, 12, false);
  const creatureShift = calculateParallaxOffset(0.5, -0.5, 24, true);

  assert.equal(wordmarkShift.x, 6);
  assert.equal(creatureShift.x, -12);
});

test('getSortedCompletenessData ranks Dreadnoughtus first in both metrics', () => {
  const byTotal = getSortedCompletenessData('totalSkeletalPercent');
  assert.equal(byTotal[0].taxon, 'Dreadnoughtus schrani');
  assert.equal(byTotal[0].totalSkeletalPercent, 45.5);

  const byTypes = getSortedCompletenessData('boneTypesExclSkullPercent');
  assert.equal(byTypes[0].taxon, 'Dreadnoughtus schrani');
  assert.equal(byTypes[0].boneTypesExclSkullPercent, 70.4);
});

test('getMassAxisPercent normalizes mass estimates between 15t and 65t', () => {
  assert.equal(getMassAxisPercent(15, 15, 65), 0);
  assert.equal(getMassAxisPercent(40, 15, 65), 50);
  assert.equal(getMassAxisPercent(65, 15, 65), 100);
});
