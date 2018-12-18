/**
 * This file contains the callbacks that you can modify to test the display of your widget
 */
import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/mock-definitions'
import { HttpResponse, RequestOptions, HeaderActionConfiguration } from '@talentsoft-opensource/integration-widget-contract'

export const hostmock: HostMock = {
    /**
     * This flag controls the requestExternalResource behavior:
     * - proxyMode: true => makes a real http request
     * - proxyMode: false => calls the mocked version defined in this file
     */
    proxyMode: false,

    /**
     * if proxyMode == true, when a direct connect request is made this secretkey will be used
     */
    secretKey: "mysec",

    /**
     * if proxyMode == true, when a direct connect request is made this login will be used
     */
    login: "mylogin",

    /**
     * if proxyMode == false, this method is called instead of sending a request
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

    // By default, this is a no operation
    setHeaderActionConfiguration: (configuration: HeaderActionConfiguration) => {
        return Promise.resolve();
    }
}
