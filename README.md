Pie chart My TS widget template
===============================

A template to build a pie chart widget.

Prerequisites
=============

- git
- node 8.12
- yarn 1.10.1

Commands
========

All those commands must be run in a terminal in the repository folder.

Download the dependencies (needed as the first command after a checkout)

```
yarn install
```

Build the package for production

```
yarn build
```

Launch the testing tool

```
yarn display
```

When the widget is successfully built, it creates a folder `dist` with a
`main.bundle.js` inside. When the widget is ready you can send the file to Talentsoft.

Project description
===================

**package.json**: node package description

**tsconfig.json**: typescript compiler options

**webpack.config.js**: build setup

**widget.conf.json**: the widget configuration. The widgetName key identifies this widget for talentsoft.

**resources**: contains one file per supported language. Each file must contain
the same set of resource keys and the corresponding text in the file's
language.

**asset**: contains the less files needed for the widget display.

**app**: contains the app code. The main file (as configured in
`webpack.config.js` is `widget.tsx`). This file must export a `Widget` class
the defines a react component.

Css management
==============

All style information must be included in the javascript bundle. With this
project you can acheive this behavior by importing less files (see `import
'../asset/widget.less';` in `widget.tsx`). The less will be compiled to css and
put into a function that will insert it in the widget's html body when it is
loaded.

If you want to use a different preprocessor or directly css you can edit
the webpack configuration.

Host api
========

The widget receive a number of properties that allows it to communicate with
the host page. It receives data (current language, display mode, etc) and can
send information using the provided methods (eg to notify the host that the
loading has finished).

You can find the host api reference here: [Host api reference](doc/hostApi/README.md)

Testing
=======

It is recommended to use the testing tool by running the `yarn display` command.

The testing tool will simulate the environment by providing a mock for the host api. You can customize those mocks by modififying the mock file located [here](mock/host-mock.ts).

For more information please see [this link](doc/display-tool.md).