import test from 'node:test';
import assert from 'node:assert/strict';

import indicatorService from '../src/services/indicatorService.js';

test('IndicatorService exposes the Phase 3 indicators', async () => {
  const result = await indicatorService.getIndicators();

  assert.deepEqual(result.indicators, ['ema', 'sma', 'rsi', 'macd', 'atr', 'bollinger']);
});
