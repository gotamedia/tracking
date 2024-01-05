import * as Constants from '../services/Tracking/constants'
import type * as Types from '../services/Tracking/types'

const getContentParam = (name: Constants.TrackingEventNames, props: Types.PageViewTrackingProps | Types.VideoTrackingProps) => {
    const {
        content
    } = props

    switch (name) {
        case Constants.TrackingEventNames.PageView: {
            const _content = content as Types.PageViewTrackingProps['content']

            return {
                id: {
                    value: _content.id,
                    system: _content.system.name
                },
                type: _content.type,
                title: _content.title || window.document.title,
                content_access_status: _content.isLocked ? (
                    'locked'
                ) : (
                    'free'
                ),
                user_has_access: _content.userHasAccess,
                section: _content.section
            }
        }

        case Constants.TrackingEventNames.Video: {
            return {
                type: content.type,
                title: content.title || window.document.title
            }
        }

        default:
            return null
    }
}

export default getContentParam