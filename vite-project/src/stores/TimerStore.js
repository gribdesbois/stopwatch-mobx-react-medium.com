import { observable, computed, action } from 'mobx'
import { v4 as uuid } from 'uuid'

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
    this.savedMilliseconds = this.milliseconds = 0
  }

  @computed get totalMillliSeconds() {
    return this.milliseconds + this.savedMilliseconds
  }

  @computed get display() {
    const tenMilliseconds = parseInt(this.totalMillliSeconds / 10, 10)
    const seconds = parseInt(tenMilliseconds / 100, 10)
    const minutes = parseInt(seconds / 60)

    return `${minutes}: ${format(seconds % 60, '00')}: ${format(
      tenMilliseconds % 100,
      '00'
    )}`
  }
}
