import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';
import {
    KHALTI_CONFIG_OPTIONS,
    KHALTI_LOOKUP_TEST_URL,
    KHALTI_LOOKUP_URL,
    KHALTI_PAYMENT_TEST_URL,
    KHALTI_PAYMENT_URL,
    KHALTI_VERIFY_TEST_URL,
    KHALTI_VERIFY_URL,
    KhaltiDto,
    KhaltiOptions,
    KhaltiRequestDto,
    PaymentMode
} from "./khalti.interface";

@Injectable()
export class KhaltiService {
    private readonly paymentMode = null;
    private readonly secretKey = null;
    private readonly initiateUrl = null;
    private readonly initiateUrlForTest = null;
    private readonly lookupUrl = null;
    private readonly lookupUrlForTest = null;
    private readonly verifyUrl = null;
    private readonly verifyUrlForTest = null;

    constructor(@Inject(KHALTI_CONFIG_OPTIONS) private readonly options: KhaltiOptions, private readonly httpService: HttpService) {
        this.paymentMode = options.paymentMode || PaymentMode.TEST;
        this.secretKey = options.secretKey;
        this.initiateUrl = options.initiateUrl || KHALTI_PAYMENT_URL;
        this.initiateUrlForTest = options.initiateUrlForTest || KHALTI_PAYMENT_TEST_URL;
        this.lookupUrl = options.lookupUrl || KHALTI_LOOKUP_URL;
        this.lookupUrlForTest = options.lookupUrl || KHALTI_LOOKUP_TEST_URL;
        this.verifyUrl = KHALTI_VERIFY_URL;
        this.verifyUrlForTest = KHALTI_VERIFY_TEST_URL;
    }


    async init(khaltiRequestDto: KhaltiRequestDto) {
        const {
            returnUrl,
            websiteUrl,
            amount,
            purchaseOrderId,
            purchaseOrderName,
            customerInfo,
            amountBreakdown,
            productDetails
        } = khaltiRequestDto;
        if (!returnUrl || !websiteUrl || !amount || !purchaseOrderId || !purchaseOrderName) {
            throw new BadRequestException("Data missing for initiating Khalti payment");
        }
        const khaltiDto: KhaltiDto = {
            return_url: returnUrl,
            website_url: websiteUrl,
            amount: amount,
            purchase_order_id: purchaseOrderId,
            purchase_order_name: purchaseOrderName,
            customer_info: customerInfo,
            amount_breakdown: amountBreakdown,
            product_details: productDetails
        }

        return await firstValueFrom(this.httpService
            .post(
                this.paymentMode.localeCompare(PaymentMode.TEST) == 0 ? this.initiateUrlForTest : this.initiateUrl,
                khaltiDto, {
                    headers: {
                        Authorization: this.secretKey,
                    },
                }));
    }

    async lookUp(data: any) {
        const {pidx} = data;
        if (!pidx) {
            throw new BadRequestException("pidx missing for validating khalti payment");
        }
        return await firstValueFrom(this.httpService
            .post(
                this.paymentMode.localeCompare(PaymentMode.TEST) == 0 ? this.lookupUrlForTest : this.lookupUrl,
                {pidx},
                {
                    headers: {
                        Authorization: this.secretKey,
                    },
                },
            ));
    }

    async verify(data: any) {
        const {token, amount} = data;
        if (!token) {
            throw new BadRequestException("token key missing for validating khalti payment");
        }
        if (!amount) {
            throw new BadRequestException("amount key missing for validating khalti payment");
        }
        const url = this.paymentMode.localeCompare(PaymentMode.TEST) == 0 ? this.verifyUrlForTest : this.verifyUrl;
        return await firstValueFrom(this.httpService
            .post(
                `${url}`,
                {token, amount},
                {
                    headers: {
                        Authorization: this.secretKey,
                    }
                    ,
                }
                ,
            ))
            ;
    }

}
