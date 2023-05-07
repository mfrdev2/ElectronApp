# ElectronApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.





# ElectronCMD

## Install electron

```
npm install --save-dev electron@latest
```

## Install asar

```
npm install asar --save
```


## Install ec-package

```
npm install -g electron-packager
```

## Electron commands for _package.json_

### Run/Start electron in debug mode

```
"start:electron": "ng build --base-href ./ && electron ."
```

### Create electron package

```
"winpackage": "electron-packager . ElectronApp --platform=win32 --arch=x64 --overwrite --app-version=1.0.0 --build-version=1.0.0 --win32metadata.ProductName=ElectronApp --FileDescription=ElectronApp --appname=electronapp --win32metadata.CompanyName=ng --app-copyright=ng --icon=eagle.ico"
```

### archive electron created package using _asar_

```
"archiveapp": "asar pack ElectronApp-win32-x64/resources/app ElectronApp-win32-x64/resources/app.asar"
```

### create package kit

```
"packit": "ng build --base-href ./ && npm run winpackage && npm  run archiveapp"
```

References:

- https://github.com/electron/electron-packager

- https://www.electronjs.org/docs/latest/tutorial/quick-start

- https://icon-icons.com/icon/eagle/98734
