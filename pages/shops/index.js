import {useState, useEffect, useCallback} from 'react';
import { Badge, Card, Icon, Filters, TextField, Button, Page, RangeSlider, ChoiceList, IndexTable, useIndexResourceState, Select, TextStyle, Thumbnail, Avatar } from "@shopify/polaris";
import { getProducts } from '../../services/products'; 
import { getResources, promotedBulkActions, bulkActions, sortOptions } from './../../common/resources/products';
import {ResourcePicker} from '@shopify/app-bridge/actions';
import { VariantMajor, ViewMajor } from '@shopify/polaris-icons'
import Link from 'next/link'
import {Encode} from './../../common/encoder'

const Index = (props) => {
    const [status, setStatus] = useState(null);
    const [moneySpent, setMoneySpent] = useState(null);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);

    const { loading, error, data } = getProducts(queryValue, status);

    const resourceName = {singular: 'product', plural: 'products'}
    

    const [products,setProducts] = useState([]);

    // const [selectedItems, setSelectedItems] = useState([]);

    const [sortValue, setSortValue] = useState('UPDATED_AT_DESC');

    const onSortChange = (selected) => {
        setSortValue(selected);
        console.log(`Sort option changed to ${selected}.`);
    }

    const handleStatusChange = useCallback(
      (value) => setStatus(value),
      [],
    );
    const handleMoneySpentChange = useCallback(
      (value) => setMoneySpent(value),
      [],
    );

    const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
    );
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleAccountStatusRemove = useCallback(() => setAccountStatus(null),[]);
    const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
    const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove, handleAccountStatusRemove, handleMoneySpentRemove]);

    const filters = [
        {
          key: 'status',
          label: 'Status',
          filter: (
            <ChoiceList
              title="Status"
              titleHidden
              choices={[
                {label: 'Active', value: 'Active'},
                {label: 'Draft', value: 'Draft'},
                {label: 'Archived', value: 'Archived'},
              ]}
              selected={status || []}
              onChange={handleStatusChange}
            />
          ),
          shortcut: true,
        },
        {
            key: 'taggedWith1',
            label: 'Tagged with',
            filter: (
            <TextField
                label="Tagged with"
                value={taggedWith}
                onChange={handleTaggedWithChange}
                labelHidden
            />
            ),
            shortcut: true,
        },
        {
          key: 'moneySpent',
          label: 'Money spent',
          filter: (
            <RangeSlider
              label="Money spent is between"
              labelHidden
              value={moneySpent || [0, 500]}
              prefix="$"
              output
              min={0}
              max={2000}
              step={1}
              onChange={handleMoneySpentChange}
            />
          ),
        },
    ];

    const disambiguateLabel = (key, value) => {
        switch (key) {
            case 'taggedWith1':
            return `Tagged with ${value}`;
            default:
            return value;
        }
    }

    const isEmpty = (value) => {
        if (Array.isArray(value)) {
        return value.length === 0;
        } else {
        return value === '' || value == null;
        }
    }

    const appliedFilters = !isEmpty(taggedWith)
        ? [
            {
            key: 'taggedWith1',
            label: disambiguateLabel('taggedWith1', taggedWith),
            onRemove: handleTaggedWithRemove,
            },
        ]
        : [];
      
    // const selectedResources, allResourcesSelected,handleSelectionChange;
        
    useEffect(()=>{
        console.log('use Effect data', data);
        const items = getResources(data)
        console.log('getProductResources', items);
        setProducts(items);
    },[data])

    // const productPicker = ResourcePicker.create(props.bridgeApp, {
    //     resourceType: ResourcePicker.ResourceType.Product,
    // });

    const {
      selectedResources,
      allResourcesSelected,
      handleSelectionChange,
    } = useIndexResourceState(products);

    const statusList = {
      "ACTIVE" : <Badge status="success" progress="complete">Active</Badge>,
      "DRAFT" : <Badge>Draft</Badge>,
      "ARCHIVED":<Badge progress="incomplete">Archived</Badge>
    }

    return (
        <Page title="Products" subtitle="The Product metafield owner type." fullWidth>
            <Card>
              <div style={{padding: '16px', display: 'flex'}}>
                <div style={{flex: 1}}>
                  <Filters
                      queryValue={queryValue}
                      filters={filters}
                      appliedFilters={appliedFilters}
                      onQueryChange={setQueryValue}
                      onQueryClear={handleQueryValueRemove}
                      onClearAll={handleClearAll}
                  ></Filters>
                </div>
                <div style={{paddingLeft: '0.4rem'}}>
                  <Select
                    labelInline
                    label="Sort by"
                    options={sortOptions}
                    value={sortValue}
                    onChange={onSortChange}
                  />
                </div>
              </div>
              <IndexTable
                resourceName={resourceName}
                itemCount={products.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                // onSelectionChange={handleSelectionChange}

                loading={loading}

                // selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}

                headings={[
                  {title: ''},
                  {title: 'Product'},
                  {title: 'Type'},
                  {title: 'Status'},
                  {title: 'Vendor'},
                  {title: 'Variants'},
                  {title: 'View'},
                ]}
              >
                {products.length>0 && products.map(({id,title,productType,description,status,vendor,createdAt,featuredImage, totalInventory}, index) => {
                  console.log(status,'status')
                  return (
                  <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(id)}
                    position={index}
                  >
                    <IndexTable.Cell>
                        <Thumbnail source={featuredImage.originalSrc} size="medium" alt="Small document" />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <TextStyle variation="strong">{title}</TextStyle>
                    </IndexTable.Cell>
                    <IndexTable.Cell>{productType}</IndexTable.Cell>
                    <IndexTable.Cell>
                      {statusList[status] != undefined ? statusList[status] : <></>}
                    </IndexTable.Cell>
                    <IndexTable.Cell>{vendor}</IndexTable.Cell>
                    <IndexTable.Cell>
                        {/* <Button>Variants</Button> */}
                        <Link href={'/'}>
                            <a className="area-settings-nav__action">
                                <div className="area-settings-nav__media">
                                    <span className="menu-icons menu-settings">
                                      <Icon source={VariantMajor} color="base" />
                                    </span>
                                </div>
                            </a>
                        </Link>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Link href={`/metafields/product/`+ Encode(id)}>
                          <a className="area-settings-nav__action">
                            <div className="area-settings-nav__media">
                              <span className="menu-icons menu-settings">
                                <Icon source={ViewMajor} color="base" />
                              </span>
                            </div>
                          </a>                                
                        </Link>                      
                    </IndexTable.Cell>
                  </IndexTable.Row>
                )})}
              </IndexTable>
            </Card>
        </Page>
        

        )
};



export default Index;