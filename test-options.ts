import {test as base} from '@playwright/test'

export type TestOptions = {
    globalURL: string
}
export const test = base.extend<TestOptions>({
    globalURL: ['', {option: true}]
})