import type { TrackingUtils } from './types'

declare global {
    interface Window {
        trackingUtils: TrackingUtils,
        dataLayer: {
            push: (data: any) => void
        },
        didomiOnReady: (() => void)[]
    }
}

export { }
