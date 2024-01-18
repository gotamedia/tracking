import DateUtility from '@gotamedia/fluffy/date'

import GlobalTracking from '../services/Tracking/GlobalTracking'

const getActiveUsageParams = () => {
    return {
        key: 'duration',
        value: DateUtility.differenceInMilliseconds(new Date(), GlobalTracking.lastPageViewEventSent!)
    }
}

export default getActiveUsageParams
