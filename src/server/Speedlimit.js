class Speedlimit {
  _speedlimits;
  _speedlimitAvgSegmentLength;
  _previousSpeedlimitIndex;
  _currentSegmentLength;

  constructor() {
    this._speedlimits = [30, 40, 50, 70];
    this._speedlimitAvgSegmentLength = 10;
    this._previousSpeedlimitIndex = -1;
    this._currentSegmentLength = 0;
  }

  randomWithProbability(outcomes, weights) {
    let totalWeight = weights.reduce((prev, curr) => (prev += curr));
    const num = Math.random();
    let sum = 0;
    let lastIndex = weights.length - 1;

    for (let i = 0; i <= lastIndex; i++) {
      sum += weights[i] / totalWeight;

      if (num < sum) return i;
    }

    return lastIndex;
  }

  getCurrentSpeedlimit() {
    const weights = this._speedlimits.map((speedlimit, index) => {
      return index === this._previousSpeedlimitIndex
        ? Math.max(
            this._speedlimitAvgSegmentLength - this._currentSegmentLength,
            0
          ) * 5
        : 1;
    });

    const currentSpeedlimitIndex = this.randomWithProbability(
      this._speedlimits,
      weights
    );

    if (currentSpeedlimitIndex !== this._previousSpeedlimitIndex) {
      this._previousSpeedlimitIndex = currentSpeedlimitIndex;
      this._currentSegmentLength = 1;
    }

    this._currentSegmentLength++;

    return this._speedlimits[currentSpeedlimitIndex];
  }
}

module.exports = Speedlimit;
