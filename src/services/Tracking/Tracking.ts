import { v4 as createUUID } from 'uuid'
import DateUtility from '@gotamedia/fluffy/date'

import GTM from '../../services/GTM'

import {
    getCookieValue,
    setCookieValue
} from '../../utils/helpers'
import getTrackingEventPayload from '../../utils/getTrackingEventPayload'
import getTrackingUserId from '../../utils/getTrackingUserId'

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

    private buildBaseEvents() {
        const sessionId = getCookieValue(this.props.cookies.sesstionId)
        const hasBeen30MinSinceLastEvent = DateUtility.isAfter(new Date(), DateUtility.addMinutes(GlobalTracking.lastEventTime!, 30))

        if (!sessionId || hasBeen30MinSinceLastEvent) {

            setCookieValue({
                name: this.props.cookies.sesstionId,
                value: createUUID(),
                secure: this.props.isProduction
            })

            const clientId = getCookieValue(this.props.cookies.clientId)

            if (!clientId) {
                setCookieValue({
                    name: this.props.cookies.clientId,
                    value: createUUID(),
                    secure: this.props.isProduction,
                    days: 365
                })

                this.trackingEvents.push(getTrackingEventPayload(Constants.TrackingEventNames.FirstVisit, this.props))
            }

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
        if (typeof this.props.pushHandler === 'function') {
            this.props.pushHandler(event)
        } else {
            GTM.push(event)
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

            // Reassign `session_id` & `client_id` to make sure all events has the latest values.
            this.trackingEvents = this.trackingEvents.map((eventItem) => {
                const updatedEventItem = {
                    ...eventItem,
                    session_id: getCookieValue(this.props.cookies.sesstionId)!,
                    user: {
                        ...eventItem.user,
                        client_id: getCookieValue(this.props.cookies.clientId)!
                    }
                }

                if (eventItem.user.id) {
                    updatedEventItem.user.id = {
                        ...updatedEventItem.user.id!,
                        value: getTrackingUserId(this.props.cookies, this.props.userId)
                    }
                }

                return updatedEventItem
            })

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