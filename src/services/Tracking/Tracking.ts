import { v4 as createUUID } from 'uuid'
import DateUtility from '@gotamedia/fluffy/date'

import GTM from '../../services/GTM'

import {
    getCookieValue,
    setCookieValue
} from '../../utils/helpers'
import getTrackingEventPayload from '../../utils/getTrackingEventPayload'

import GlobalTracking from './GlobalTracking'

import * as Constants from './constants'
import type * as Types from './types'

class Tracking {
    props: Types.TrackingProps

    trackingEvents: Types.TrackingData[]

    constructor(props: Types.TrackingProps) {
        this.props = props
        this.trackingEvents = []

        this.push()
    }

    private handleClientAndSessionIds () {
        const clientId = getCookieValue(this.props.cookies.clientId)
        const sessionId = getCookieValue(this.props.cookies.sessionId)

        if (!clientId) {
            setCookieValue({
                name: this.props.cookies.clientId,
                value: createUUID(),
                secure: this.props.isProduction,
                days: 365
            })
        }

        if (!sessionId) {
            setCookieValue({
                name: this.props.cookies.sessionId,
                value: createUUID(),
                secure: this.props.isProduction
            })
        }
    }

    private buildBaseEvents() {
        const clientId = getCookieValue(this.props.cookies.clientId)
        const sessionId = getCookieValue(this.props.cookies.sessionId)
        const hasBeen30MinSinceLastEvent = DateUtility.isAfter(new Date(), DateUtility.addMinutes(GlobalTracking.lastEventTime!, 30))

        if (!clientId) {
            this.trackingEvents.push(getTrackingEventPayload(Constants.TrackingEventNames.FirstVisit, this.props))
        }

        if (!sessionId || hasBeen30MinSinceLastEvent) {
            this.trackingEvents.push(getTrackingEventPayload(Constants.TrackingEventNames.SessionStart, this.props))
        }

        if (this.props.name === Constants.TrackingEventNames.PageView) {
            const activeUsageEvent = GlobalTracking.getLastPageViewActiveUsageEvent()

            if (activeUsageEvent) {
                this.trackingEvents.push(activeUsageEvent)
            }
        }
    }

    private _pushHandler(event: Types.EventObject) {
        this.handleClientAndSessionIds()

        const clientId = getCookieValue(this.props.cookies.clientId)!
        const sessionId = getCookieValue(this.props.cookies.sessionId)!

        const eventPayload: Types.EventObject = {
            ...event,
            // Reassign `session_id` & `client_id` to make sure all events has the latest values.
            trackingData: event.trackingData.map((eventItem) => {
                return {
                    ...eventItem,
                    session_id: sessionId,
                    user: {
                        ...eventItem.user,
                        client_id: clientId
                    }
                }
            })
        }

        if (typeof this.props.pushHandler === 'function') {
            this.props.pushHandler(eventPayload)
        } else {
            GTM.push(eventPayload)
        }
    }

    private push() {
        if (this.props.name) {
            GlobalTracking.handle(this.props)

            this.buildBaseEvents()

            const event = getTrackingEventPayload(this.props.name, this.props)

            if (this.props.name === Constants.TrackingEventNames.PageView) {
                GTM.reset()

                GlobalTracking.lastPageViewEvent = event
                GlobalTracking.lastPageViewEventSent = new Date()
            }

            this.trackingEvents.push(event)

            GlobalTracking.lastEventTime = new Date()

            this._pushHandler({
                ...this.props.extendedEvent,
                event: Constants.GtmEventNames.BnTracking,
                trackingData: this.trackingEvents
            })
        }
    }
}

export default Tracking