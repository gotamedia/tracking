import type * as Types from '../services/Tracking/types'

const getVideoParams = (props: Types.VideoTrackingProps) => {
    const {
        id,
        title,
        playTime,
        system,
        currentTime,
        timePast
    } = props.video

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
