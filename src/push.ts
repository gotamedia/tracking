import { isClient } from './utils/helpers'

import Tracking, { type TrackingProps } from './services/Tracking'

const push = (props: TrackingProps) => {
    if (isClient) {
        new Tracking(props)
    }
}

export default push