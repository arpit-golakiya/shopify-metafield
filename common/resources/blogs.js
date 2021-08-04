import { AddNoteMajor } from '@shopify/polaris-icons'

const getResources = (data) => {

    if(undefined === data) return [];

    let edges = data.products.edges;
    let list = [];
    for(let i in edges){
        list.push({
            id: edges[i].node.id ?? '', 
            title: edges[i].node.title ?? '', 
            handle: edges[i].node.handle ?? '', 
            url: edges[i].node.url ?? '', 
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