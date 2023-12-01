import { isClient } from '../../utils/helpers'

let isDidomiReady = false
let eventsQueue: unknown[] = []

if (isClient) {
    if (!Array.isArray(window.didomiOnReady)) {
        window.didomiOnReady = []
    }

    window.didomiOnReady.push(() => {
        isDidomiReady = true

        eventsQueue.forEach((event) => push(event))

        eventsQueue = []
    })
}

const push = (event: unknown, waitForConsent = true) => {
    if (!waitForConsent || isDidomiReady) {
        window.dataLayer.push(event)
    } else {
        eventsQueue.push(event)
    }
}

const reset = (properties?: string[]) => {
    const event = {
        event: undefined,
        trackingData: undefined
    }

    if (Array.isArray(properties) && properties.length) {
        // @ts-ignore
        properties.forEach(property => event[property] = undefined)
    }

    push(event)
}
const isReady = () => isDidomiReady

const initiate = () => {
    if (isClient) {
        window.trackingUtils = {
            sendRequest: async (url, options, isDebugMode) => {
                try {
                    const response = await window.fetch(url, options)

                    if (isDebugMode) {
                        console.info('@gotamedia/tracking | Successfully sent request: ', { url, options, response })
                    }
                } catch (error) {
                    if (isDebugMode) {
                        console.error('@gotamedia/tracking | Failed to send request: ', { url, options, error })
                    }
                }
            }
        }
    }
}

const GTM = {
    push,
    reset,
    isReady,
    initiate
}

export default GTM
