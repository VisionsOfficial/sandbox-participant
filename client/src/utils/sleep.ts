/// Set of utils for simulating waiting for API calls for ex

/**
 * Sleep for x miliseconds
 *
 * Default is 2000ms
 */
export const sleep = (ms = 2000): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Sleep for x miliseconds then rejects
 *
 * Default is 2000ms
 */
export const sleepError = (ms = 2000): Promise<Error> => {
    return new Promise((_, rej) =>
        setTimeout(() => {
            rej(new Error("Sleep error"));
        }, ms)
    );
};

/**
 * Sleep for x milliseconds then resolves with
 * whatever value was passed in
 */
export function sleepGeneric<T>(ms = 2000, value: T): Promise<T> {
    return new Promise((res) =>
        setTimeout(() => {
            res(value);
        }, ms)
    );
}

/**
 * Random delay sleep
 */
export const randomDelaySleep = (min: number, max: number): Promise<void> => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return sleep(delay);
};

/**
 * Sequential sleep
 */
export const sequentialSleep = async (msList: number[]): Promise<void> => {
    for (const ms of msList) {
        await sleep(ms);
    }
};

/**
 * Sleep if condition is valid
 */
export const conditionalSleep = (
    condition: boolean,
    ms = 2000
): Promise<void> => {
    return condition ? sleep(ms) : Promise.resolve();
};

/**
 * Sequential sleep with random delays
 */
export const randomDelaySequentialSleep = async (
    min: number,
    max: number,
    sequences: number
): Promise<void> => {
    for (const ms of Array(sequences).fill(1)) {
        await randomDelaySleep(min, max);
        await sleep(ms);
    }
};
