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

Download the dependencies

```
yarn install
```

Build the package for production

```
yarn build
```

Build the package for debug

```
yarn build:debug
```

Build the package for debug and watch for file modifications

```
yarn watch
```

Project description
===================

**package.json**: node package description

**tsconfig.json**: typescript compiler options

**webpack.config.js**: build setup

**resources**: contains one file per supported language. Each file must contain
the same set of resource keys and the corresponding text in the file's
language.

**asset**: contains assets needed for the widget display. It could be images,
fonts, css/less files etc.

**app**: contains the app code. The main file (as configured in
`webpack.config.js` is `widget.tsx`). This file must export a `Widget` class
the defines a react component.
