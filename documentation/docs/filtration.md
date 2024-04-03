# Logs filtration
Structure logs can be filtered by log's properties. For filter used [SearchJs](https://github.com/deitch/searchjs). Filter type is a valid json object.

> Note: The application works with uploaded logs in **internal format**, add 'data.{field name}' at the top level of field in your query.

## Examples
*Input logs file*

```json
{"@t":"2024-03-06T07:43:20.5672449Z","@mt":"Starting up","@l":"Information","EnvironmentName":"Staging"}
{"@t":"2024-03-06T07:43:23.3405140Z","@mt":"Executing ViewResult, running view {ViewName}.","@l":"Warning","@tr":"f3e14fda062a0ae0d641782c77ee0617","@sp":"0aee0c652548be62","ViewName":"Index","EventId":{"Id":1,"Name":"ViewResultExecuting"},"SourceContext":"Microsoft.AspNetCore.Mvc.ViewFeatures.ViewResultExecutor","ActionId":"9ea02b27-cd15-4432-82b1-7f9768a48e4b","ActionName":"DealerServiceSystem.Web.Controllers.CheckListCategoryController.Index (DealerServiceSystem.Web)","RequestId":"40000bc6-0002-f200-b63f-84710c7967bb","EnvironmentName":"Staging"}
{"@t":"2024-03-06T07:43:23.7431244Z","@mt":"Executed ViewResult - view {ViewName} executed in {ElapsedMilliseconds}ms.","@l":"Debug","@tr":"f3e14fda062a0ae0d641782c77ee0617","@sp":"0aee0c652548be62","ViewName":"Index","ElapsedMilliseconds":404.2372,"EventId":{"Id":4,"Name":"ViewResultExecuted"},"SourceContext":"Microsoft.AspNetCore.Mvc.ViewFeatures.ViewResultExecutor","ActionId":"9ea02b27-cd15-4432-82b1-7f9768a48e4b","RequestId":"40000bc6-0002-f200-b63f-84710c7967bb","EnvironmentName":"Staging"}
{"@t":"2024-03-06T07:43:23.7466340Z","@mt":"Executed action in {ElapsedMilliseconds}ms","@l":"Warning","@tr":"f3e14fda062a0ae0d641782c77ee0617","@sp":"0aee0c652548be62","ElapsedMilliseconds":536.3229,"EventId":{"Id":105,"Name":"ActionExecuted"},"SourceContext":"Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker","RequestId":"40000bc6-0002-f200-b63f-84710c7967bb","EnvironmentName":"Staging"}
```
### Filter by `RequestId`
filter: `{"data.RequestId": "40000bc6-0002-f200-b63f-84710c7967bb"}`
### Filter by `RequestId` and `@l`(Log level)
filter: `{"data.RequestId": "40000bc6-0002-f200-b63f-84710c7967bb","data.@l":"Warning"}`
### Filter by several log levels
filter: `"{"data.@l":["Warning", "Information"]}`