import {DynamicModule, Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import KhaltiAsyncOptions, {KHALTI_CONFIG_OPTIONS} from "./khalti.interface";
import {KhaltiService} from "./khalti.service";

@Module({})
export class KhaltiModule {
    static registerAsync(options: KhaltiAsyncOptions): DynamicModule {
        return {
            module: KhaltiModule,
            imports: [HttpModule, ...options.imports],
            providers: [{
                provide: KHALTI_CONFIG_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject
            },
                KhaltiService
            ],
            exports: [KhaltiService]
        }
    }
}
