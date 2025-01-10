import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks';

function DebounceInputNumber({ value, delay = 300, setState = () => {}, children }) {
    const [text, setText] = useState('');
    const debounceResult = useDebounce(text, delay);
    useEffect(() => {
        debounceResult != null && debounceResult != undefined && debounceResult != 0 && setState(debounceResult);
    }, [debounceResult]);
    useEffect(() => {
        setText(value);
    }, [value]);
    const childWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            value: text,
            onChange: (e) => {
                setText(e);
                if (e == '' || e == 0 || e == null) setState(0);
            },
        });
    });

    return childWithProps;
}
export default React.memo(DebounceInputNumber);
