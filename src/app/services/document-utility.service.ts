import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { SharedApiUrls } from '../urls';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class DocumentUtilityService {
    url = '';
    constructor(public dialog: MatDialog, private apiService: ApiService) { }
    /* preview(exchange) {
        const dialogRef = this.dialog.open(DocumentPreviewDialogComponent, {
            data: exchange,
            height: '95%',
            width: '60%',
            disableClose: true
        });
    }
    previewChat(exchange) {
        exchange.isChat = true;
        this.dialog.open(DocumentPreviewDialogComponent, {
            data: exchange,
            height: '95%',
            width: '60%',
            // disableClose: true
        });
    } */

    /* upload(exchange) {
        const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
            data: exchange,
            height: '80vh',
            width: '100vw',
            disableClose: true
        });
    } */

    arrayBufferToBase64 = function (buffer: any) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    setImageContentType = function (defaultType: any) {
        let contentType = "image/";
        if (/jpg/i.test(defaultType) || /jpeg/i.test(defaultType)) {
            contentType = contentType + "jpg";
        } else if (/png/i.test(defaultType)) {
            contentType = contentType + "png";
        } else if (/gif/i.test(defaultType)) {
            contentType = contentType + "gif";
        }
        return contentType;
    };

    downloadFromDocId(documentId: any, extensionType: any, name: any) {
        const req = {
            "documentId": documentId
        }
        return this.apiService.postData(SharedApiUrls.genericDocDownload, req,
            { responseType: "arraybuffer", observe: 'response' }).pipe(
                tap((successData: any) => {
                    const contentType = successData['headers'].get('content-type');
                    if (successData.body.byteLength > 0) {
                        if (/image|jpg|jpeg|png|gif|tif|tiff/i.test(contentType)) {
                            this.url = "data:" + this.setImageContentType(contentType) + ";base64,"
                                + this.arrayBufferToBase64(successData.body);
                        } else {
                            // if(/pdf/i.test(responseHeader['content-type']))
                            // Create object Url for download file
                            const byteArray = new Uint8Array(successData.body);
                            const blobData = new Blob([byteArray], { type: contentType });
                            this.url = window.URL.createObjectURL(blobData);
                        }
                        const a: any = document.createElement('A');
                        a['href'] = this.url;
                        a['download'] = name ? name : "Document" + '.' + extensionType;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                })
            )
    }


    /*  anchorDocument(documentDetails, feed) {
         if (documentDetails.documentId) {
             this.appService.anchoredDocument = {
                 document: documentDetails,
                 exchange: feed
             };
         } else {
             this.appService.anchoredDocument = {};
         }
     } */

    downloadDirectly(url: any, extensionType: any, name?: any) {
        const a: any = document.createElement('A');
        a['href'] = url;
        a['download'] = name ? name : "Document" + '.' + extensionType;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    printDirectly(url: any) {
        const myWindow = window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=800,height=600");
        myWindow!.print()
    }



}
