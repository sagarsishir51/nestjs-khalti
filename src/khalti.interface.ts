import {FactoryProvider, ModuleMetadata} from "@nestjs/common";

export const KHALTI_CONFIG_OPTIONS = 'KHALTI_CONFIG_OPTIONS'
export const KHALTI_PAYMENT_TEST_URL = 'https://dev.khalti.com/api/v2/epayment/initiate/'
export const KHALTI_PAYMENT_URL = 'https://khalti.com/api/v2/epayment/initiate/'
export const KHALTI_LOOKUP_TEST_URL = 'https://dev.khalti.com/api/v2/epayment/lookup/'
export const KHALTI_LOOKUP_URL = 'https://khalti.com/api/v2/epayment/lookup/'
export const KHALTI_VERIFY_URL = 'https://khalti.com/api/v2/payment/verify/'

export enum PaymentMode {
    TEST = 'TEST',
    LIVE = 'LIVE',
}

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}

export interface AmountBreakdown {
    label: string;
    amount: number;
}

export interface ProductDetail {
    identity: string;
    name: string;
    total_price: number;
    quantity: number;
    unit_price: number;
}

export interface KhaltiDto {
    return_url: string;
    website_url: string;
    amount: number;
    purchase_order_id: string;
    purchase_order_name: string;
    customer_info?: CustomerInfo;
    amount_breakdown?: AmountBreakdown[];
    product_details?: ProductDetail[];

}

export interface KhaltiRequestDto {
    returnUrl: string;
    websiteUrl: string;
    amount: number;
    purchaseOrderId: string;
    purchaseOrderName: string;
    customerInfo?: CustomerInfo;
    amountBreakdown?: AmountBreakdown[];
    productDetails?: ProductDetail[];

}

export interface KhaltiOptions {
    paymentMode: PaymentMode;
    secretKey: string;
    secretKeyEPayment?: string;
    initiateUrl?: string;
    initiateUrlForTest?: string;
    lookupUrl?: string;
    lookupUrlForTest?: string;
}


type KhaltiAsyncOptions =
    Pick<ModuleMetadata, 'imports'>
    & Pick<FactoryProvider<KhaltiOptions>, 'useFactory' | 'inject'>;


export default KhaltiAsyncOptions;