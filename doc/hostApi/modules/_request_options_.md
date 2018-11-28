[@talentsoft-opensource/integration-widget-contract](../README.md) > ["request-options"](../modules/_request_options_.md)

# External module: "request-options"

## Index

### Interfaces

* [GetRequestOptions](../interfaces/_request_options_.getrequestoptions.md)
* [PatchRequestOptions](../interfaces/_request_options_.patchrequestoptions.md)
* [PostRequestOptions](../interfaces/_request_options_.postrequestoptions.md)
* [PutRequestOptions](../interfaces/_request_options_.putrequestoptions.md)

### Type aliases

* [RequestOptions](_request_options_.md#requestoptions)

---

## Type aliases

<a id="requestoptions"></a>

###  RequestOptions

**Ƭ RequestOptions**: * [GetRequestOptions](../interfaces/_request_options_.getrequestoptions.md) &#124; [PostRequestOptions](../interfaces/_request_options_.postrequestoptions.md) &#124; [PutRequestOptions](../interfaces/_request_options_.putrequestoptions.md) &#124; [PatchRequestOptions](../interfaces/_request_options_.patchrequestoptions.md)
*

*Defined in request-options.ts:62*

This type represents the parameters needed for a request. There are two mandatory fields: _url_ and _verb_. You can also provide a _body_ field if the verb is not GET.

___

