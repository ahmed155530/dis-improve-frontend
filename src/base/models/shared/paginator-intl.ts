import { MatPaginatorIntl } from "@angular/material/paginator";
import { LocalStorageEnum } from "base/enums/LocalStorageEnum.enum";

const RangeLabelEn = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 of ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} of ${length}`;
}


const RangeLabelAr = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 من ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} من ${length}`;
}


export function getPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    switch (localStorage.getItem(LocalStorageEnum.displayDirection)) {
        case 'ltr':
            paginatorIntl.itemsPerPageLabel = 'Items per page';
            paginatorIntl.nextPageLabel = 'Next page';
            paginatorIntl.previousPageLabel = 'Previous page';
            paginatorIntl.firstPageLabel = 'First page';
            paginatorIntl.lastPageLabel = 'Last page';
            paginatorIntl.getRangeLabel = RangeLabelEn;
            break;
        case 'rtl':
            paginatorIntl.itemsPerPageLabel = 'وحدات لكل صفحة:';
            paginatorIntl.nextPageLabel = 'الصفحة التالية';
            paginatorIntl.previousPageLabel = 'الصفحة السابقة';
            paginatorIntl.firstPageLabel = 'الصفحة الأولى';
            paginatorIntl.lastPageLabel = 'الصفحة الأخيرة';
            paginatorIntl.getRangeLabel = RangeLabelAr;
            break;
        default:
            paginatorIntl.itemsPerPageLabel = 'وحدات لكل صفحة:';
            paginatorIntl.nextPageLabel = 'الصفحة التالية';
            paginatorIntl.previousPageLabel = 'الصفحة السابقة';
            paginatorIntl.firstPageLabel = 'الصفحة الأولى';
            paginatorIntl.lastPageLabel = 'الصفحة الأخيرة';
            paginatorIntl.getRangeLabel = RangeLabelAr;
            break;
    }
    return paginatorIntl;
}