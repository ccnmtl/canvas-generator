export class CC {
    constructor(type, page, row, column) {

        switch (type){
            case 'banner_row':
                this.method = 'createRowsFromArray';
                this.array = [[['banner-slot']]];
                break;
            case 'welcome_row':
                this.method = 'createRowsFromArray';
                this.array = [[['image-slot']], [['image-slot']]];
                break;
            default:
                console.log('Unknown type');
        }
    }
}