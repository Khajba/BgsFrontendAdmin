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
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';
import { LocalizePipe } from '../core/localization/localize.pipe';
import { SecureUrlPipe } from '../core/secure-url.pipe';

@NgModule({
    declarations: [
        LocalizePipe,
        SecureUrlPipe
    ],
    exports: [
        InputTextModule,
        ButtonModule,
        ToastModule,
        MatIconModule,
        FormsModule,
        DropdownModule,
        TableModule,
        InputTextareaModule,
        DialogModule,
        ConfirmDialogModule,
        VirtualScrollerModule,
        PaginatorModule,
        FileUploadModule,
        LocalizePipe,
        SecureUrlPipe
    ],
    providers: [
        MessageService,
        ConfirmationService
    ]
})
export class BgsSharedModule { }