import { NgModule } from "@angular/core";
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [],
    exports: [
        InputTextModule,
        ButtonModule,
        ToastModule,
        MatIconModule,
        FormsModule
    ],
    providers: [MessageService]
})
export class SharedModule {

}