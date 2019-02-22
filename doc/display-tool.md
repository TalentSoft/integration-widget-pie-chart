# Getting Started:

This tools provides a testing environnement for your widget.

# Prerequisites:

1. You should have the following software installed:

    - git
    - node 8.12
    - yarn 1.10.1

2. The first time you use this tool, you need to install the libraries by
running `yarn install` in a terminal in the project folder (defined in
package.json)

3. You should already have built your widget on your machine and generated a
widget bundle file (for example, main.bundle.js) on your local drive. You also
need a mock bundle file. Please check the [exemple
widget](https://github.com/TalentSoft/integration-widget-pie-chart) for a
template to generate such bundles.

# How to launch:

To launch the build and deployment of your widget, run `yarn start
[path to your widget bundle (widget)] [path to your mock script]`

# Displaying the widget:

Once it's launched, you can view your widget by opening a browser and
navigating to: http://localhost:5555/.

# Configuring the port number of local url

If you need to change the port number of the local url, you can change the `port`
variable in the file index.js in the root folder.

# Customizing the environment of the widget with the mock file

In the testing environment provided by this tool, all host methods such as
`requestExternalResource` are mocked. You may provide your own implementation
to test your widget in different conditions.

In order to do this you need to provide a mock script that exports an object
that implements the `HostMock` interface. Please check the [exemple
widget](https://github.com/TalentSoft/integration-widget-pie-chart) for an
exemple mock script (in the mock folder).

## Example

Suppose that your API returns a list of objects
and you want to mock your API by returning :

```javascript
[
            {
                id: 'ToDo',
                y: 0,
                z: 2458
            },
            ...
]
```

=> You should implement the method requestExternalResource in a typescript file as:

```javascript
/**
 * This file contains the callbacks that you can modify to test the display of your widget
 */
import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/mock-definitions'
import { HttpResponse, RequestOptions } from '@talentsoft-opensource/integration-widget-contract'

export const hostmock: HostMock = {
    /**
     * This flag controls the requestExternalResource behavior:
     * - proxyMode: true => makes a real http request
     * - proxyMode: false => calls the mocked version defined in this file
     */
    proxyMode: true,

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
                y: 0,
                z: 2458
            },
            {
                id: 'InProgress',
                y: 0,
                z: 3874
            },
            {
                id: 'ToValidate',
                y: 0,
                z: 2375
            },
            {
                id: 'Validated',
                y: 0,
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
    }
}
```

This file must be compiled with webpack with a library output set to
`integration/hostmock`. The path to the result to the widget-display-tool
script.

# Known issue(s):

If the widget bundle gets deleted (eg by a rebuild) while the tool is launched
and displays your widget, you will get the following error in the Visual Studio
terminal:

```
ERROR in [copy-webpack-plugin] unable to locate 'C:\xxx\main.bundle.js' at 'C:\yyy\dist\main.bundle.js'
i ｢wdm｣: Failed to compile.
```

To fix that issue, you need to stop this tool :

- execute `Ctrl+C` (Answer Y to end the program)
- Relaunch the tool: run `yarn display` in the widget folder