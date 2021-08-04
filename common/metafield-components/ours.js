import {useState, useEffect, useCallback, useRef} from 'react';
import { Card, Avatar, Icon, Filters, TextField, Button, Page, 
        RangeSlider, ChoiceList, IndexTable, useIndexResourceState, 
        Select, TextStyle, Thumbnail, Modal, TextContainer, Layout, FormLayout, Stack, Badge, Heading, ButtonGroup } from "@shopify/polaris";
import MetafieldService from '../../services/metafields'; 
import { getMetafieldResources, promotedBulkActions, bulkActions, sortOptions } from './resources';
import {ResourcePicker} from '@shopify/app-bridge/actions';
import { DeleteMajor, DuplicateMinor } from '@shopify/polaris-icons'
import Link from 'next/link'
import {MetaModal, Activator} from './modal-form'
import {useRouter} from 'next/router'

import {Decode} from '../encoder'
import InputElement from '../inputElement'
import styles from '../../styles/Metafields.module.css'

const Ours = (props) => {
    const router = useRouter()
    const {id, metatype} = router.query 

    const [queryValue, setQueryValue] = useState(null);

    const { loading, error, data } = MetafieldService.getAll(id, metatype,queryValue);

    const resourceName = {singular: 'metafield', plural: 'metafields'}
    
    const [metafields,setMetafields] = useState([]);

    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
    }, [handleQueryValueRemove]);
        
    useEffect(()=>{
        // console.log('use Effect data', data);
        const items = getMetafieldResources(data)
        // console.log('getMetafieldResources', items);
        setMetafields(items);
    },[data])

    const {
      selectedResources,
      allResourcesSelected,
      handleSelectionChange,
    } = useIndexResourceState(metafields);

    const [removeTodo, { }] = MetafieldService.remove(id,metatype);
    
    const handleDelete = (metafieldId) => {
        console.log('metafieldId', metafieldId)
        removeTodo({ 
            variables: { 
              input: {
                id: metafieldId
              } 
            } 
        }).then((res)=>{
            console.log('::res', [res])

        });
        
    };

    return (
        <Page fullWidth>
            <Card>
              <div style={{padding: '16px', display: 'flex'}}>
                <div style={{flex: 1}}>
                  <Filters
                      filters={[]}
                      queryValue={queryValue}
                      onQueryChange={setQueryValue}
                      onClearAll={handleClearAll}
                  >
                      <Activator/>
                  </Filters>
                </div>
              </div>
              <IndexTable
                resourceName={resourceName}
                itemCount={metafields.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                bulkActions={bulkActions}
                loading={loading}
                condensed
                headings={[
                  {title: 'Namespace'},
                  {title: 'Key'},
                  {title: 'Value Type'},
                  {title: 'Description'},
                ]}
              >
                {metafields.length && metafields.map(({id,namespace,key,value,valueType,description,ownerType,legacyResourceId}, index) => {
                  return (
                  <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(id)}
                    position={index}
                  >
                        <div style={{padding: '1.2rem 1.6rem', width: '100%'}}>
                          <Layout>
                            <Layout.Section oneHalf>
                              <Stack spacing="loose">
                                <Badge size="small" status="success"> <TextStyle variation="strong">Namespace</TextStyle> {namespace}</Badge>
                                <Badge size="small" status="attention"> <TextStyle variation="strong">Key</TextStyle> {key}</Badge>
                                <Badge size="small" status="info">{valueType}</Badge>
                              </Stack>
                            </Layout.Section>
                            <Layout.Section oneHalf>
                              <div className={styles.MetafieldButtonRight}>
                                <Button>
                                  <Icon source={DuplicateMinor} accessibilityLabel="Copy" />
                                </Button>  
                                <Button onClick={handleDelete.bind(this, id)}>
                                  <Icon source={DeleteMajor} accessibilityLabel="Remove" />
                                </Button>  
                              </div>
                            </Layout.Section>
                            <Layout.Section>
                              <InputElement type="text" name="value" id="value" value={value} style={{margin:'10px'}} />
                            </Layout.Section>
                          </Layout>
                        </div>
                  </IndexTable.Row>
                )})}
              </IndexTable>
            </Card>
            <MetaModal />
        </Page>
    )
};

export default Ours;