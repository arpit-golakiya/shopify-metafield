import {useState, useCallback, useRef, useEffect} from 'react';
import { TextField } from '@shopify/polaris'
// import ReactQuill from 'react-quill';
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(
    () => import('react-quill'),
    { ssr: false }
  )



import 'react-quill/dist/quill.snow.css';

const InputElement = ({type, value, label, name, id, onChange, style, error}) => {
    const [text, setText] = useState('');
    console.log('text', [text])
    return (
        <>{type.value == 'rich_text_box' ? 
        <ReactQuill theme="snow" value={value} onChange={onChange}/>
        : 
        <TextField label={label} type={type.type} name={name} id={id} value={value} onChange={onChange}  placeholder={`Enter ${type.label}`} style={style} error={error} />}  </>
    )
}

export default InputElement
