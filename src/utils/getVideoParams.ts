import { TrackingEventContentTypes } from '../services/Tracking/constants'
import type * as Types from '../services/Tracking/types'

const getVideoParams = (props: Types.VideoTrackingProps) => {
    const {
        video: {
            id,
            title,
            playTime,
            system,
            currentTime,
            timePast
        },
        content
    } = props

    const paramsToAppend: Types.ParamsToAppend = []

    let eventType = 'milestone'

    if (playTime === '0%') {
        eventType = 'start'

        paramsToAppend.push({
            name: 'event_name',
            value: 'video content start'
        })
    }

    paramsToAppend.push({
        name: 'event_name',
        value: `video content ${eventType}`
    })

    paramsToAppend.push({
        name: 'content',
        value: {
            type: content.type || TrackingEventContentTypes.NewsFeed,
            title: content.title || window.document.title,
            media: {
                media_type: 'video',
                content_type: 'content',
                event_type: eventType,
                title: title,
                canonical_url: window.location.toString(),
                id: {
                    value: id,
                    system: system.name
                },
                time: {
                    percent: playTime,
                    current_time: currentTime,
                    time_past: timePast
                }
            }
        }
    })

    return paramsToAppend
}

export default getVideoParams
