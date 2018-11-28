Getting Started:
----------------
This tool simulates the display of your widget locally

Prerequisites:
--------------
1. You should have installed Visual Studio Code on your machine

2. The first time you use this tool, you need to install the libraries (defined in package.json) before launching the tool.
    To install the libraries:
        Open a terminal in Visual Studio Code
        Run: yarn install

3. You should already have built your widget on your machine and generated a bundle file (for example, main.bundle.js) on your local drive.

How to launch:
--------------

To launch the build and deployment of your widget locally:

- If a display script as been configured, you can use it by running `yarn display` in the widget folder.
- Otherwise, in the display tool folder, run: `yarn start [path to your widget bundle (widget)] [path to your mock script]`

Display the widget:
-------------------

Once it's launched, you can view your widget here : http://localhost:5555/

Configure port number of local url
----------------------------------

If you need to change the port number of the local url, you can change the port variable in the file start.js.

Customize data displayed by your widget:
----------------------------------------

You need to provide a mock script that exports an object that implements the `HostMock` interface.

Example
=======

Suppose that your API returns a list of objects with attribute {title, count} and you want to mock your API 
by returning : `[{title='Object1', count=10}, {title='Object2', count=5}]`

=> You should implement the method loadData in a typescript file as:

    import { HostApiOptions } from '@talentsoft-opensource/widget-display-tool/src/host-api-options'
    import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/mock-definitions'

    const hostmock: HostMock = {
        requestExternalResource: (options: HostApiOptions) => {
            return new Promise<Response>((resolve, reject) => {
                const response = new Response("");
                resolve(response);
            });
        },
        
        // By default, this is a no operation
        openPartnerLink: (url: string) => {
            return Promise.resolve(() => { });
        },
        
        getConfiguration: () : { [name: string]: string } => {
            return { };
        }
    }
    export default hostmock

Compile this file with CommonJs module and provide the path to the result to the widget-display-tool script

Known issue(s):
---------------
    If you rebuild your widget while the tool is launched and displays your widget, you will get the following error in the Visual Studio terminal:

```
    ERROR in [copy-webpack-plugin] unable to locate 'C:\xxx\main.bundle.js' at 'C:\yyy\dist\main.bundle.js'
    i ｢wdm｣: Failed to compile.

To fix that issue, you need to stop this tool :

    In Visual Studio code terminal, execute Ctrl+C (Answer Y to end the program)
    Relaunch the tool: yarn start --env.bundleFile [PATH + Filename of your bundle]