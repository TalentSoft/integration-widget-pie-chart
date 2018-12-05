/*
This file contains the callbacks that you can modify to test the display of your widget

The method requestExternalResource allows you to mock the data retrieved by your API : by default, requestExternalResource returns an empty object

The method openPartnerLink allows you to open your application in a new tabulation - this is only relevant if you have a link in your
widget for redirecting to your application : by default, openPartnerLink does nothing

The method getConfiguration returns mocked configuration parameters for your widget in the format key-value.
*/
import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/mock-definitions'
import { HttpResponse, RequestOptions } from '@talentsoft-opensource/integration-widget-contract'

export const hostmock: HostMock = {
    /**
     * This flag controls the requestExternalResource behavior:
     * - proxyMode: true => makes a real http request
     * - proxyMode: false => calls the mocked version defined in this file
     */
    proxyMode: false,

    /**
     * if proxyMode == true, use this secretkey for directConnect
     */
    secretKey: "mysec",

    /**
     * if proxyMode == true, use this login for directConnect
     */
    login: "mylogin",

    /**
     * if proxyMode == false, use this method instead of sending a request
     */
    requestExternalResource: (options: RequestOptions) => {
        const data = [
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
     * This object is passed to the *params* prop in the widget
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
    }
}
