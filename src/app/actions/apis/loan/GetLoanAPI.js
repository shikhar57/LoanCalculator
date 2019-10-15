/**src/app/actions/apis/search/GetAlbumAPI.jsx
 * Get album API
 */
import API from '../api';
import C from '../../constants';
import {CONFIG} from '../../../configs/configs';


export default class GetLoanAPI extends API {
    constructor(data = '', timeout = 10000) {
        super('GET', timeout, false);
        this.type = C.GET_LOAN_DETAILS;
        this.timeout = timeout;
        this.loanAmt = data.loanAmt;
        this.loanDuration = data.loanDuration;
        this.res = null;
    }


    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.res = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${CONFIG.calcLoanUrl}?amount=${this.loanAmt}&numMonths=${this.loanDuration}`;
    }

    getBody() {
        return {}
    }

    getHeaders() {
        return {}
    }

    getPayload() {
        return this.res;
    }

    getCustomConfigs() {
        return {
            timeout: this.timeout
        }
    }
}