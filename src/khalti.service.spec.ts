import {KhaltiService} from "./khalti.service";
import {HttpService} from "@nestjs/axios";
import {KhaltiOptions, KhaltiRequestDto, PaymentMode} from "./khalti.interface";

describe('KhaltiService', () => {
    let data:KhaltiOptions={
        paymentMode: PaymentMode.TEST,
        secretKey:"Key 160f7902da124fcf829432576f2437a2"
    }
    let khaltiService: KhaltiService;

    beforeEach(() => {
        khaltiService = new KhaltiService(data,new HttpService());
    });

    it('should be defined', () => {
        expect(khaltiService).toBeDefined();
    });

    it('should init data', async () => {
        const khaltiRequestDto: KhaltiRequestDto = {
            amount: 10*100,
            purchaseOrderId: "TX12",
            purchaseOrderName: '0',
            returnUrl:"http://localhost:3000/payment/sucess",
            websiteUrl:"http://localhost:3000"
        };
        const data = await khaltiService.init(khaltiRequestDto);

        console.log("data",data);
        expect(data).toBeDefined();
        expect(data).toHaveProperty("pidx")
        expect(data).toHaveProperty("paymentUrl")
        expect(data).toHaveProperty("expiresAt")
        expect(typeof data.expiresAt).toBe("string");
        expect(data).toHaveProperty("expiresIn")
    });

    it('should verify data', async () => {
        const data = await khaltiService.lookUp({pidx:"TURzMqhSKLRF8RN94epKxP"});
        console.log("data",data);
        expect(data).toBeDefined();
        expect(data).toHaveProperty("status")
        expect(data).toHaveProperty("pidx")
        expect(data).toHaveProperty("transactionId")
        expect(data).toHaveProperty("totalAmount")
    });
})