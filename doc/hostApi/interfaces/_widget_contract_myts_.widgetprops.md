[@talentsoft-opensource/integration-widget-contract](../README.md) > ["widget-contract-myts"](../modules/_widget_contract_myts_.md) > [WidgetProps](../interfaces/_widget_contract_myts_.widgetprops.md)

# Interface: WidgetProps

This interface represents the properties that the React widget will receive

## Hierarchy

**WidgetProps**

## Index

### Properties

* [language](_widget_contract_myts_.widgetprops.md#language)
* [myTSHostService](_widget_contract_myts_.widgetprops.md#mytshostservice)
* [params](_widget_contract_myts_.widgetprops.md#params)

---

## Properties

<a id="language"></a>

###  language

**● language**: *`string`*

*Defined in widget-contract-myts.ts:66*

The current user language. Uses a four letter format as defined here: [https://msdn.microsoft.com/en-us/library/hh441729.aspx](https://msdn.microsoft.com/en-us/library/hh441729.aspx)

___
<a id="mytshostservice"></a>

###  myTSHostService

**● myTSHostService**: *[MyTSHostService](_widget_contract_myts_.mytshostservice.md)*

*Defined in widget-contract-myts.ts:60*

This object exposes a number of methods that allows the widget to communicate with the host page.

___
<a id="params"></a>

###  params

**● params**: *`object`*

*Defined in widget-contract-myts.ts:72*

Contains all non sensitive context parameters. The keys must be defined per widget and the values can be defined for each client in the Talentsoft administration.

#### Type declaration

[name: `string`]: `string`

___

