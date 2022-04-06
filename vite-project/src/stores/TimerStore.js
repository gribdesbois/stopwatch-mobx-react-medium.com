/* eslint-disable max-classes-per-file */
import { observable, computed, action } from 'mobx'
import { v4 as uuid } from 'uuid'
import format from 'format-number-with-string'
import moment from 'moment'

export class Timer {
  @observable milliseconds

  @observable savedMilliseconds

  constructor(initialMilliSeconds = 0) {
    this.milliseconds = initialMilliSeconds
    this.savedMilliseconds = 0
    this.id = uuid()
  }

  @action saveTime() {
    this.savedMilliseconds += this.milliseconds
    this.milliseconds = 0
  }

  @action reset() {
    this.savedMilliseconds = 0
    this.milliseconds = 0
  }

  @computed get totalMillliSeconds() {
    return this.milliseconds + this.savedMilliseconds
  }

  @computed get display() {
    const tenMilliseconds = parseInt(this.totalMillliSeconds / 10, 10)
    const seconds = parseInt(tenMilliseconds / 100, 10)
    const minutes = parseInt(seconds / 60, 10)

    return `${minutes}: ${format(seconds % 60, '00')}: ${format(
      tenMilliseconds % 100,
      '00'
    )}`
  }
}

export class TimerStore {
  @observable isRunning

  @observable timer

  @observable startTime

  @observable laps

  constructor() {
    this.isRunning = false
    this.timer = new Timer()
    this.laps = []
  }

  @computed get mainDisplay() {
    return this.timer.display
  }

  @computed get hasStarted() {
    return this.timer.totalMillliSeconds !== 0
  }

  @action measure() {
    if (!this.isRunning) return
    this.timer.milliseconds = moment().diff(this.startTime)

    setTimeout(() => this.measure(), 10)
  }

  @action startTimer() {
    if (this.isRunning) return
    this.isRunning = true
    this.startTime = moment()
    this.measure()
  }

  @computed get length() {
    return this.laps.length
  }

  @computed get lapTime() {
    return this.laps.map((e) => e.totalMillliSeconds).reduce((x, y) => x + y, 0)
  }

  @action lapTimer() {
    this.laps.push(new Timer(this.timer.totalMillliSeconds - this.lapTime))
  }

  @computed get lapData() {
    const data = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.laps.length; i++) {
      data.push({
        lap: this.laps[i],
        text: `Lap ${i + 1}`,
      })
    }
    return data.reverse()
  }

  @action stopTimer() {
    this.timer.saveTime()
    this.isRunning = false
  }

  @action resetTimer() {
    this.timer.reset()
    this.laps = []
    this.isRunning = false
  }
}
