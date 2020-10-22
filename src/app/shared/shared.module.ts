import { NgModule } from "@angular/core";
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [],
    exports: [
        InputTextModule,
        ButtonModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class SharedModule {

}