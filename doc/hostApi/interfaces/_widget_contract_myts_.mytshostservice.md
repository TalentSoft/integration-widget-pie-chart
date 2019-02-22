[@talentsoft-opensource/integration-widget-contract](../README.md) > ["widget-contract-myts"](../modules/_widget_contract_myts_.md) > [MyTSHostService](../interfaces/_widget_contract_myts_.mytshostservice.md)

# Interface: MyTSHostService

This interface represents the data and services offered by the Talentsoft host

## Hierarchy

**MyTSHostService**

## Index

### Properties

* [getUrlForCurrentContext](_widget_contract_myts_.mytshostservice.md#geturlforcurrentcontext)
* [loadData](_widget_contract_myts_.mytshostservice.md#loaddata)
* [openUrlInCurrentTab](_widget_contract_myts_.mytshostservice.md#openurlincurrenttab)
* [openUrlInNewTab](_widget_contract_myts_.mytshostservice.md#openurlinnewtab)
* [requestExternalResource](_widget_contract_myts_.mytshostservice.md#requestexternalresource)
* [setDataIsLoaded](_widget_contract_myts_.mytshostservice.md#setdataisloaded)
* [setHeaderActionConfiguration](_widget_contract_myts_.mytshostservice.md#setheaderactionconfiguration)
* [widgetIsEnlarged](_widget_contract_myts_.mytshostservice.md#widgetisenlarged)

---

## Properties

<a id="geturlforcurrentcontext"></a>

###  getUrlForCurrentContext

**● getUrlForCurrentContext**: *`function`*

*Defined in widget-contract-myts.ts:47*

**warning** This method is deprecated and should not be used.

#### Type declaration
▸(url: *`string`*): `Promise`<`string`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |

**Returns:** `Promise`<`string`>

___
<a id="loaddata"></a>

###  loadData

**● loadData**: *`function`*

*Defined in widget-contract-myts.ts:31*

**warning** This method is deprecated and should not be used.

#### Type declaration
▸(): `Promise`<`any`[]>

**Returns:** `Promise`<`any`[]>

___
<a id="openurlincurrenttab"></a>

###  openUrlInCurrentTab

**● openUrlInCurrentTab**: *`function`*

*Defined in widget-contract-myts.ts:43*

This method allows to create an autoconnect link and open it in the current tab.

#### Type declaration
▸(url: *`string`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |

**Returns:** `void`

___
<a id="openurlinnewtab"></a>

###  openUrlInNewTab

**● openUrlInNewTab**: *`function`*

*Defined in widget-contract-myts.ts:39*

This method allows to create an autoconnect link and open it in a new tab.

#### Type declaration
▸(url: *`string`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |

**Returns:** `void`

___
<a id="requestexternalresource"></a>

###  requestExternalResource

**● requestExternalResource**: *`function`*

*Defined in widget-contract-myts.ts:51*

This methods allows to send an authentified request to an external resource.

#### Type declaration
▸(options: *[RequestOptions](../modules/_request_options_.md#requestoptions)*): `Promise`<[HttpResponse](_widget_contract_myts_.httpresponse.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [RequestOptions](../modules/_request_options_.md#requestoptions) |

**Returns:** `Promise`<[HttpResponse](_widget_contract_myts_.httpresponse.md)>

___
<a id="setdataisloaded"></a>

###  setDataIsLoaded

**● setDataIsLoaded**: *`function`*

*Defined in widget-contract-myts.ts:35*

This method must be called when the widget is ready to be displayed to the user.

#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="setheaderactionconfiguration"></a>

###  setHeaderActionConfiguration

**● setHeaderActionConfiguration**: *`function`*

*Defined in widget-contract-myts.ts:55*

This method allows to configure actions displayed in the widget header.

#### Type declaration
▸(configuration: *[HeaderActionConfiguration](_header_action_configuration_.headeractionconfiguration.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| configuration | [HeaderActionConfiguration](_header_action_configuration_.headeractionconfiguration.md) |

**Returns:** `void`

___
<a id="widgetisenlarged"></a>

###  widgetIsEnlarged

**● widgetIsEnlarged**: *`function`*

*Defined in widget-contract-myts.ts:59*

This method returns if the widget is enlarged or not.

#### Type declaration
▸(): `boolean`

**Returns:** `boolean`

___

