import { NgModule } from "@angular/core";
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [],
    exports: [
        InputTextModule,
        ButtonModule,
        ToastModule,
        MatIconModule,
        FormsModule,
        DropdownModule,
        TableModule,
        InputTextareaModule,
        DialogModule
    ],
    providers: [MessageService]
})
export class SharedModule {

}