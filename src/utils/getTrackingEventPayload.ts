import getActiveUsageParams from './getActiveUsageParams'
import getVideoParams from './getVideoParams'
import getPaywallParams from './getPaywallParams'
import getEcommerceReceiptParams from './getEcommerceReceiptParams'
import getContentParam from './getContentParam'
import getBaseTrackingEventPayload from './getBaseTrackingEventPayload'

import * as Constants from '../services/Tracking/constants'
import type * as Types from '../services/Tracking/types'

const getTrackingEventPayload = (name: Constants.TrackingEventNames, props: Types.TrackingProps): Types.TrackingData => {
    const paramsToAppend: Types.ParamsToAppend = []

    switch (name) {
        case Constants.TrackingEventNames.ActiveUsage:
            paramsToAppend.push(...getActiveUsageParams())
            break

        case Constants.TrackingEventNames.Video:
            paramsToAppend.push(...getVideoParams(props as Types.VideoTrackingProps))
            break

        case Constants.TrackingEventNames.PaywallLoaded:
            paramsToAppend.push(...getPaywallParams(props as Types.PaywallLoadedTrackingProps))
            break

        case Constants.TrackingEventNames.EcommerceReceipt:
            paramsToAppend.push(...getEcommerceReceiptParams(props as Types.EcommerceReceiptTrackingProps))
            break

        case Constants.TrackingEventNames.FirstVisit:
        case Constants.TrackingEventNames.SessionStart:
        case Constants.TrackingEventNames.PageView:
        default:
            break
    }

    const content = getContentParam(name, props as (Types.PageViewTrackingProps | Types.VideoTrackingProps))

    const eventPayload = getBaseTrackingEventPayload(name, props)

    if (content) {
        (eventPayload as Types.TrackingData).content = content
    }

    paramsToAppend.forEach((item) => {
        // @ts-ignore
        eventPayload[item.name] = item.value
    })

    return JSON.parse(JSON.stringify(eventPayload))
}

export default getTrackingEventPayload