const getMetafieldResources = (data) => {

    if(undefined === data) return [];

    // console.log('metafields data', data)
    let edges = data.product.metafields.edges;
    let list = [];
    for(let i in edges){
        list.push({
            id: edges[i].node.id??'',
            namespace: edges[i].node.namespace??'',
            key: edges[i].node.key??'', 
            value: edges[i].node.value??'', 
            valueType: edges[i].node.valueType??'', 
            description: edges[i].node.description??'', 
            ownerType: edges[i].node.ownerType??'', 
            legacyResourceId: edges[i].node.legacyResourceId??'', 
        });
    }
    return list
}

const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
];

const bulkActions = [
    {
      content: 'Edit',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
];

const sortOptions = [
    {label: 'Newest update', value: 'UPDATED_AT_DESC'},
    {label: 'Oldest update', value: 'UPDATED_AT_ASC'},
]

export { getMetafieldResources, promotedBulkActions, bulkActions, sortOptions };