/* eslint-disable max-classes-per-file */
import { observable, computed, action } from 'mobx'
import { v4 as uuid } from 'uuid'
import format from 'format-number-with-string'

import moment, { Moment } from 'moment'

import ILap from '../@types/ILap'

export interface ITimer {
  milliseconds: number
  savedMilliseconds: number
  id: string
  saveTime: () => void
  reset: () => void
  totalMilliSeconds: number
}
export class Timer implements ITimer {
  @observable milliseconds

  @observable savedMilliseconds

  id

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

  @computed get totalMilliSeconds() {
    return this.milliseconds + this.savedMilliseconds
  }

  @computed get display() {
    const tenMillisecondsNumber = this.totalMilliSeconds / 10 // parseInt takes a string as arg
    const secondsNumber = tenMillisecondsNumber / 100
    const minutesNumber = secondsNumber / 60

    const tenMilliseconds = parseInt(tenMillisecondsNumber.toString(), 10)
    const seconds = parseInt(secondsNumber.toString(), 10)
    const minutes = parseInt(minutesNumber.toString(), 10)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return `${minutes}: ${format(seconds % 60, '00') as string}: ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      format(tenMilliseconds % 100, '00') as string
    }`
  }
}

export interface ITimerStore {
  isRunning: boolean
  timer: Timer
  startTime: Moment | undefined
  laps: ILap[]
  mainDisplay: string
  hasStarted: boolean
  measure: () => void
  startTimer: () => void
  length: number
  lapTime: number
  lapData: {
    lap: ILap
    text: string
  }[]
  stopTimer: () => void
  resetTimer: () => void
}
export class TimerStore implements ITimerStore {
  @observable isRunning

  @observable timer

  @observable startTime: Moment | undefined

  @observable laps: ILap[]

  constructor() {
    this.isRunning = false
    this.timer = new Timer()
    this.laps = []
  }

  @computed get mainDisplay() {
    return this.timer.display
  }

  @computed get hasStarted() {
    return this.timer.totalMilliSeconds !== 0
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.laps.map((e) => e.totalMilliSeconds).reduce((x, y) => x + y, 0)
  }

  @action lapTimer() {
    this.laps.push(new Timer(this.timer.totalMilliSeconds - this.lapTime))
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
