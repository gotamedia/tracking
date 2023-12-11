import GTM from '../../services/GTM'

import getBaseTrackingEventPayload from '../../utils/getBaseTrackingEventPayload'

import * as Constants from './constants'
import type * as Types from './types'

class GlobalTracking {
    initiated: boolean

    closing: boolean

    props: Types.TrackingProps

    _lastEventTime?: Date

    _lastPageViewEvent?: Types.TrackingData

    _lastPageViewEventSent?: Date

    constructor() {
        this.initiated = false
        this.closing = false
        this.props = {} as Types.TrackingProps
    }

    get lastEventTime() {
        return this._lastEventTime
    }

    set lastEventTime(value) {
        this._lastEventTime = value
    }

    get lastPageViewEvent() {
        return this._lastPageViewEvent
    }

    set lastPageViewEvent(value) {
        this._lastPageViewEvent = value
    }

    get lastPageViewEventSent() {
        return this._lastPageViewEventSent
    }

    set lastPageViewEventSent(value) {
        this._lastPageViewEventSent = value
    }

    private _pushHandler(event: Types.EventObject) {
        if (typeof this.props.pushHandler === 'function') {
            this.props.pushHandler(event)
        } else {
            GTM.push(event)
        }
    }

    public getLastPageViewActiveUsageEvent() {
        if (this._lastPageViewEvent) {
            return {
                ...this._lastPageViewEvent,
                ...getBaseTrackingEventPayload(Constants.TrackingEventNames.ActiveUsage, this.props)
            }
        }

        return null
    }

    public handle(props: Types.TrackingProps) {
        this.props = props

        if (!this.initiated) {
            this.initiated = true

            window.addEventListener("beforeunload", () => {
                this.closing = true
            })

            window.document.addEventListener('visibilitychange', () => {
                if (!this.closing && document.visibilityState === 'hidden') {
                    const activeUsageEvent = this.getLastPageViewActiveUsageEvent()

                    if (activeUsageEvent) {
                        this._pushHandler({
                            ...this.props?.extendedEvent,
                            event: Constants.GtmEventNames.BnTracking,
                            trackingData: [activeUsageEvent]
                        })
                    }
                }

                if (document.visibilityState === 'visible') {
                    this._lastPageViewEventSent = new Date()
                }
            })
        }
    }
}

export default new GlobalTracking()
