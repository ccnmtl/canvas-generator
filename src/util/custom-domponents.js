export class CC {
    constructor(type) {

        switch (type){
            case 'banner-row':
                this.method = 'createRowsFromArray';
                break;
            case 'welcome-row':
                this.method = 'createRowsFromArray';
                break;
            default:
                console.log('Unknown type');
        }
    }
}
