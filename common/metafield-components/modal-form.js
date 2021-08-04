import {useState, useCallback, useRef} from 'react';
import { TextField, 
         Select, 
         FormLayout, 
         Layout, 
         Modal, 
         Button,
         Toast,
         InlineError,
} from "@shopify/polaris";
import InputElement from './../inputElement'
import {metafieldTypes, valueType as MetaValueType} from './metafieldTypes'
import MetafieldService from './../../services/metafields'; 
import {useRouter} from 'next/router'
import ReeValidate from 'ree-validate'
import Rules from './rules'

let Activator = ()=>(<></>);

const MetaModal = () => {
    const router = useRouter()
    const {id, metatype} = router.query 

    const [active, setActive] = useState(false);
    const [save, setSave] = useState(false);

    const toggleSave = useCallback(() => setSave((save) => !save), []); 
    
    const toastMarkup = save ? (
        <Toast content="Added Metafields" onDismiss={toggleSave} />
      ) : null;

    const buttonRef = useRef(null);

    const [namespace, setNamespace] = useState('');
    const [key, setKey] = useState('');
    const [type, setType] = useState({label:'', value:''});
    const [valueType, setValueType] = useState(MetaValueType.STRING);
    
    const [value, setValue] = useState('');

    // validation
    let validator = new ReeValidate.Validator(Rules.get())

    const [errors, setErrors] = useState(validator.errors);
    
    const handleChange = useCallback( (string, id) => {
        const _errors = validator.errors

        // reset errors for url field
        _errors.remove(name)

        switch(id){
            case 'namespace':
                setNamespace(string);
                break;
            case 'key':
                setKey(string);
                break;
            case 'type':
                const selected_type = metafieldTypes.find((item)=>item.value == string);
                if(selected_type != undefined){
                    setType(selected_type);
                    setValueType(selected_type.key)    
                    console.log('selected_type.key', selected_type)
                    validator = new ReeValidate.Validator( Rules.update('value', string).get() )
                }  
                break;
            case 'value':
                setValue(string);
                break;
        }

        validator.validate(id, string)
        .then(() => {
            setErrors(_errors)
        })

    },[errors])

    const handleOpen = useCallback(() => setActive(true), []);

    const handleClose = useCallback(() => {
        setActive(false);
    }, []);

    const [addTodo, { data }] = MetafieldService.add(id,metatype);
    
    const handleSave = useCallback(() => {

        const metafield = {
            key:key,
            value:value,
            valueType:valueType,
            namespace:namespace,
        }
        const _errors = validator.errors

        const valid = validator.validateAll(metafield)
        
        if (valid) {
            addTodo({ 
                variables: { 
                    metafield 
                } 
            }).then(async (res)=>{
                console.log('::res', [res])
    
                const pres = await fetch('/api/products/add', {
                    method: 'POST',
                    body: JSON.stringify(metafield),
                  })
                  const json = await pres.json()
                
                  if (json.errors) {
                    console.log('Failed to fetch API')
                  }
    
                  console.log("Added Product Metafield", pres)
              
    
                toggleSave()
            });
    
            setActive(false);
    
        } else {
            
            setErrors(_errors)        
        }


        // router.reload();
    }, [key,value,valueType,namespace, data, save, errors]);

    Activator = ()=>(
        <div ref={buttonRef}>
            <Button onClick={handleOpen}>Add</Button>
        </div>
    );


    return (
        <>
            <Modal
                activator={buttonRef}
                open={active}
                onClose={handleClose}
                title="Add New Metafield"
                primaryAction={{
                    content: 'Save',
                    onAction: handleSave,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleClose,
                    },
                ]} 
                large
                >
                <Modal.Section>
                    <FormLayout>
                        <Layout>
                            <Layout.Section oneThird>
                                <TextField label="Namespace" name="namespace" id="namespace" value={namespace}  onChange={handleChange} placeholder="Enter Namespace" error={errors.has('namespace')} />
                                {errors.has('namespace') && <InlineError message={errors.first('namespace')} fieldID="namespace" />}
                            </Layout.Section>
                            <Layout.Section oneThird>
                                <TextField label="Key" name="key" id="key" value={key} onChange={handleChange} placeholder="Enter Key" error={errors.has('key')} />
                                {errors.has('key') && <InlineError message={errors.first('key')} fieldID="key" />}
                            </Layout.Section>
                            <Layout.Section oneThird>
                                <Select label="Type" name="type" id="type" value={type.value} options={metafieldTypes} onChange={handleChange} placeholder="Enter Type" error={errors.has('type')} />
                                {errors.has('type') && <InlineError message={errors.first('type')} fieldID="type" />}
                            </Layout.Section>
                            <Layout.Section fullWidth>
                                <InputElement label="Value" type={type} name="value" id="value" value={value} onChange={handleChange} error={errors.has('value')} />
                                {errors.has('value') && <InlineError message={errors.first('value')} fieldID="value" />}
                            </Layout.Section>
                        </Layout>
                    </FormLayout>
                </Modal.Section>
            </Modal>
            {toastMarkup}
        </>
    )    
}

export {MetaModal, Activator}; 