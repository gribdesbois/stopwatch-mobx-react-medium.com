/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-use-before-define
export = format

declare function format(str: string, options?: format.IOverrideOptions): string

declare namespace format {
  export interface IOverrideOptions {
    /**
     * if true will override and leave out prefix and suffix
     * @default false
     */
    noUnits?: boolean

    /**
     *  if true will override both integer and decimals separator and leave them out
     * @default false (two spaces)
     */
    noSeparators?: boolean
  }
}
/* declare module 'format-number-with-string' */
