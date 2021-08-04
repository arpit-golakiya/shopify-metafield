const valueType = () => {}
valueType.STRING = 'STRING'; 
valueType.INTEGER = 'INTEGER'; 
valueType.JSON_STRING = 'JSON_STRING'; 

// type: "text"
// type: "email"
// type: "number"
// type: "password"
// type: "search"
// type: "tel"
// type: "url"
// type: "date"
// type: "datetime-local"
// type: "month"
// type: "time"
// type: "week"
// type: "currency"

const metafieldTypes = [
    {
        "label":"String",
        "value":"string",
        "type":"text",
        "key": valueType.STRING
    },
    {
        "label":"Number",
        "value":"number",
        "type":"number",
        "key": valueType.INTEGER
    },
    {
        "label":"Email",
        "value":"email",
        "type":"email",
        "key":valueType.STRING
    },
    {
        "label":"Rich Text Box",
        "value":"rich_text_box",
        "type":"text",
        "key":valueType.JSON_STRING
    },
    {
        "label":"File",
        "value":"file",
        "type":"file",
        "key":valueType.STRING
    },
    {
        "label":"Image",
        "value":"image",
        "type":"file",
        "key":valueType.STRING
    },
    {
        "label":"Multiple Image",
        "value":"multiple_image",
        "type":"file",
        "key":valueType.STRING
    },
    {
        "label":"URL",
        "value":"url",
        "type":"url",
        "key":valueType.STRING
    },
    {
        "label":"Phone",
        "value":"tel",
        "type":"tel",
        "key":valueType.STRING
    },
    {
        "label":"Color Picker",
        "value":"color_picker",
        "type":"text",
        "key":valueType.JSON_STRING
    },
    {
        "label":"Date Picker",
        "value":"date_picker",
        "type":"date",
        "key":valueType.JSON_STRING
    },
    {
        "label":"Json",
        "value":"json",
        "type":"text",
        "key":valueType.JSON_STRING
    }
]

export {metafieldTypes, valueType}