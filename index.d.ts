import type { TrackingUtils } from './src/types'

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
