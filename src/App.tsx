import React, {useEffect, useRef, useState} from 'react';
import './App.css';


interface _passcode {
    onSuccess?: () => void,
    onError?: () => void,
    digits?: number | 4,
    inputType?: 'Text' | 'Number'
}

enum specialKeyEvents {
    backspace = 'Backspace'
}

function PasscodeComponent(props: _passcode) {
    const [state, setState] = useState<Array<{ [key: number]: number | undefined }>>([{}]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentFocus, setCurrentFocus] = useState(0)
    /**
     * Calculate the initial setup for this component
     */
    useEffect(() => {
            setState([]);
            /*
            default input elements are 4
             */
            let length: number = 4;
            if (props.digits) {
                length = props.digits;
            }
            for (let i: number = 0; i < length; i++) {
                setState((prev: Array<{ [key: number]: number | undefined }>) => {
                    return [...prev, {[i]: undefined}]
                })
            }
            return () => {
                setState([]);
            }
        },

        []
    );

    /**
     * Checks for keyup event and react to it
     * @param key
     * @param event
     */
    const handleInput = (key: number, event: KeyboardEvent) => {
        const base: number = 0;
        const limit: number = props.digits ? props.digits : state.length;
        const _keytype: string = event.code;
        debugger
        if (_keytype === specialKeyEvents.backspace) {
            if (key > base) {
                let nextId = key - 1;
                setCurrentFocus(nextId);
            }
        } else {
            if (currentFocus < limit) {
                setCurrentFocus(key + 1);
            }
        }

    }
    /**
     * on every mutation of currentFocus, this will execute
     */
    useEffect(() => {
        inputRef?.current?.focus()
    }, [currentFocus]);

    return (
        <>
            <div className={'input-wrapper'}>
                {state.map((element: any, index: number) =>
                    <div key={index} className={'input-wrapper'}>
                        <input onKeyUp={(event: any) => {
                            handleInput(state.indexOf(element), event)
                        }} ref={state.indexOf(element) === currentFocus ? inputRef : undefined}
                               maxLength={1}
                               className={'input-ele'}
                               id={state.indexOf(element).toString()} type={props.inputType ? props.inputType : 'Text'}/>
                    </div>
                )}
            </div>
        </>
    )
        ;
}

export default PasscodeComponent;
