import { AddNoteMajor } from '@shopify/polaris-icons'

const getResources = (data) => {

    if(undefined === data) return [];
    console.log("ORDERS RESOURCE",data)
    let edges = data.products.edges;
    let list = [];
    for(let i in edges){
        list.push({
            id: edges[i].node.id ?? '',
            title: edges[i].node.title ?? '',
            description: edges[i].node.description ?? '',
            totalInventory: edges[i].node.totalInventory ?? '',
            featuredImage: edges[i].node.featuredImage ?? {originalSrc:''},
            status: edges[i].node.status ?? '',
            productType: edges[i].node.productType ?? '',
            vendor: edges[i].node.vendor ?? '',
            legacyResourceId: edges[i].node.legacyResourceId ?? '',
            createdAt: edges[i].node.createdAt ?? '',
            updatedAt: edges[i].node.updatedAt ?? '',
        });
    }
    return list
}

const promotedBulkActions = [
    {
      content: 'Edit',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
];

const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
];

const sortOptions = [
    {label: 'Newest update', value: 'UPDATED_AT_DESC'},
    {label: 'Oldest update', value: 'UPDATED_AT_ASC'},
]

export { getResources, promotedBulkActions, bulkActions, sortOptions };