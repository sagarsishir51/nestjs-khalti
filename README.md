## Introduction
This is a simple wrapper for Khalti Payment extended from [@dallotech/nestjs-khalti](https://github.com/DalloTech/nestjs-khalti). It supports ePayment Gateway(NEW) and transaction verification, but later more will be added. Just ping us or open pull request and contribute :)
## Installation

```bash
$ npm i --save nestjs-khalti 
$ yarn add nestjs-khalti 
```

#### Importing module Async

```typescript
import { KhaltiModule } from 'nestjs-khalti';
@Module({
  imports: [
      KhaltiModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<AllConfig>) => ({
              secretKey: configService.get("----your key-----", {infer: true}),
              paymentMode: configService.get("----your key-----", {infer: true}),
          })
      }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```
#### Calling Init Method to initialize payment for ePayment Gateway(NEW)

```typescript
import { KhaltiService,KhaltiRequestDto } from 'nestjs-khalti';

@Injectable()
export class YourService {
  constructor(private khaltiService: KhaltiService) {}
    
    async initPayment(){
        //...your code
        //amount needs to be in paisa for khalti
        const khaltiRequestDto: KhaltiRequestDto = {
            amount: 10*100,
            purchaseOrderId: 0,
            purchaseOrderName: 0,
            returnUrl: 'return url of frontend',
            websiteUrl: 'url of frontend'
        };
        const initData = await this.khaltiService.init(khaltiRequestDto);
        //...use initData where required as use case
    
  }
}
```

#### Calling LookUp Method for ePayment Gateway(NEW)

```typescript
import { KhaltiService } from 'nestjs-khalti';

@Injectable()
export class YourService {
  constructor(private khaltiService: KhaltiService) {}
    
    async verifyPayment(data){
        //...your code
        const {pidx} = data;
        const response = await this.khaltiService.verify({pidx});
        //..your code can verify the response data with your business logic and response format
  }
}
```

## License

This package is MIT licensed.
