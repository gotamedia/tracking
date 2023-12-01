import type * as Types from '../services/Tracking/types'

const getEcommerceReceiptParams = (props: Types.EcommerceReceiptTrackingProps) => {
    const {
        orderId,
        orderPrice,
        campaign,
        product,
        payment
    } = props.ecommerce

    const paramsToAppend: Types.ParamsToAppend = []

    const ecommercePayload: any = { currency: 'sek' }

    if (campaign) {
        ecommercePayload.campaign = campaign
    }

    ecommercePayload.products = [
        {
            ...product,
            market: 'se',
            quantity: 1
        }
    ]

    ecommercePayload.order = {
        id: orderId,
        value: orderPrice,
        payment: payment
    }

    paramsToAppend.push({
        name: 'ecommerce',
        value: ecommercePayload
    })

    return paramsToAppend
}

export default getEcommerceReceiptParams
