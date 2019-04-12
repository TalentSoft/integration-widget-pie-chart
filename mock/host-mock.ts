/**
 * This file contains the callbacks that you can modify to test the display of your widget
 */
import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/mock-definitions'
import { HttpResponse, RequestOptions } from '@talentsoft-opensource/integration-widget-contract'
import { ExpenseStatus } from '../app/expense-status';

export const hostmock: HostMock = {
    /**
     * This flag controls the requestExternalResource behavior:
     * - proxyMode: true => makes a real http request
     * - proxyMode: false => calls the mocked version defined in this file
     */
    proxyMode: false,

    /**
     * If proxyMode == true, when a direct connect request is made this secretkey will be used.
     * It should be identical to the one configured in the remote service that will be accessed.
     */
    secretKey: "mysec",

    /**
     * If proxyMode == true, when a direct connect request is made this login will be used
     */
    login: "mylogin",

    /**
     * If proxyMode == false, this method is called instead of sending a request
     */
    requestExternalResource: (options: RequestOptions) => {
        let data: any[];
        if (options.url.indexOf('enlarged') == -1) {
            data = [
                {
                    id: 'ToDo',
                    y: 12,
                    z: 2458
                },
                {
                    id: 'InProgress',
                    y: 5,
                    z: 3874
                },
                {
                    id: 'ToValidate',
                    y: 7,
                    z: 2375
                },
                {
                    id: 'Validated',
                    y: 18,
                    z: 129
                },
            ];
        } else {
            data = [
                {
                    object: 'Formation React JS',
                    type: 'Frais de déplacements',
                    state: ExpenseStatus.Validated,
                    amount: '0,00 €'
                },
                {
                    object: 'Workshop',
                    type: 'Frais de déplacements',
                    state: ExpenseStatus.Pending,
                    amount: '13,20 €'
                },
                {
                    object: 'Tickets resto',
                    type: 'Tickets resto',
                    state: ExpenseStatus.WaitingForValidation,
                    amount: '4,50 €'
                },
                {
                    object: 'Rdv client avant vente',
                    type: 'Frais de déplacements',
                    state: ExpenseStatus.WaitingForValidation,
                    amount: '47,00 €'
                }
            ];
        }
    
        return new Promise<HttpResponse>((resolve, reject) => {
            const response: HttpResponse = {
                body: JSON.stringify(data),
                status: 200,
                headers: {}
            };
            resolve(response);
        });
    },

    /**
     * This object is passed to the *params* prop in the widget.
     * It may contain any property you need for the widget.
     * In production, those properties are defined for each 
     * client but you may provide default values.
     */
    configuration: {
        foo: "bar"
    },

    /**
     * This function is called to generate the autoconnect url when using
     * openUrlinNewTab or openUrlinCurrentTab
     */
    getAutoConnectUrl(url: string): string {
        return url;
    },
}
