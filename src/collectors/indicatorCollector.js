import IndicatorService from '../services/indicatorService.js';

class IndicatorCollector {
  async run() {
    console.log('');
    console.log('=================================');
    console.log('Indicator Collector Started');
    console.log('=================================');

    const summary = await IndicatorService.getIndicators();
    console.log(`Loaded indicators: ${summary.indicators.join(', ')}`);

    console.log('Indicator Collector Finished');
  }
}

export default new IndicatorCollector();