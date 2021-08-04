import {useState, useEffect, useCallback} from 'react';
import { Badge, Card, Icon, Filters, TextField, Button, Page, RangeSlider, ChoiceList, IndexTable, useIndexResourceState, Select, TextStyle, Thumbnail, Avatar } from "@shopify/polaris";
import { getOrders } from '../../services/orders'; 
import { getProducts } from '../../services/products'; 
import { getResources, promotedBulkActions, bulkActions, sortOptions } from './../../common/resources/orders';
import {ResourcePicker} from '@shopify/app-bridge/actions';
import { VariantMajor, ViewMajor } from '@shopify/polaris-icons'
import Link from 'next/link'
import {Encode} from './../../common/encoder'
import orders from "../"
const Index = (props) => {
    const [status, setStatus] = useState(null);
    const [moneySpent, setMoneySpent] = useState(null);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [orders,setOrders] = useState([]);
    // const { loading, error, data } = getProducts(queryValue,status);
    useEffect(()=> {
      getOrders().then(res => res).then(data => {
        // console.log("DATA DATA---->",data.orders)
        setOrders(data.orders)
      });
    },[])
    
     
    
    const resourceName = {singular: 'order', plural: 'orders'}
    

    

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
        
    // useEffect(()=>{
    //     console.log('use Effect data', orders);
    //     const items = getResources(orders)
    //     console.log('getProductResources', items);
    //     setProducts(items);
    // },[orders])

    // const productPicker = ResourcePicker.create(props.bridgeApp, {
    //     resourceType: ResourcePicker.ResourceType.Product,
    // });

    const {
      selectedResources,
      allResourcesSelected,
      handleSelectionChange,
    } = useIndexResourceState(orders);

    const statusList = {
      "ACTIVE" : <Badge status="success" progress="complete">Active</Badge>,
      "DRAFT" : <Badge>Draft</Badge>,
      "ARCHIVED":<Badge progress="incomplete">Archived</Badge>
    }

    return (
        <Page title="Orders" subtitle="The order metafield owner type." fullWidth>
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
                itemCount={orders.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                // onSelectionChange={handleSelectionChange}

                // loading={loading}

                // selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}

                headings={[
                  {title: 'Order'},
                  {title: 'Date'},
                  {title: 'Customer'},
                  {title: 'Total'},
                  {title: 'Payment'},
                  {title: 'Tags'},
                  {title: 'View'},
                ]}
              >
                 {orders.length>0 && orders.map(({id,name,created_at,customer,current_total_price,financial_status, tags}, index) => {
                  // console.log(status,'status')
                  return (
                  <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(id)}
                    position={index}
                  >
                    <IndexTable.Cell>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </IndexTable.Cell>
                    <IndexTable.Cell>{created_at}</IndexTable.Cell>
                    <IndexTable.Cell>{customer != undefined ? customer.first_name : "No Customer"}</IndexTable.Cell>
                    <IndexTable.Cell>{current_total_price}</IndexTable.Cell>
                    <IndexTable.Cell><Badge status="warning" progress="complete">Payment {financial_status}</Badge>
                      {/* {statusList[financial_status] != undefined ? statusList[financial_status] : <></>} */}
                    </IndexTable.Cell>
                    <IndexTable.Cell>{tags != "" ? tags : "No Tags"}</IndexTable.Cell>
                    <IndexTable.Cell>
                        {/* <Link href={`/metafields/product/`+ Encode(id)}> */}
                          <a className="area-settings-nav__action">
                            <div className="area-settings-nav__media">
                              <span className="menu-icons menu-settings">
                                <Icon source={ViewMajor} color="base" />
                              </span>
                            </div>
                          </a>                                
                        {/* </Link>                       */}
                    </IndexTable.Cell>
                  </IndexTable.Row>
                )})} 
              </IndexTable>
            </Card>
        </Page>
        

        )
};

export default Index;
// export async function getStaticProps() {
//   const data = "";
//   getOrders().then((res) => {
//     console.log("STATIC",res)
//     data = res;
//   })
//   console.log("DATA---->",data)
//   return {
//     props: {
//       orders:data
//     }, // will be passed to the page component as props
//   }
// }