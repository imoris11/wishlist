import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Snack } from './Snack';

export const Share = ({ link }) => {
    const [ copied, setCopied ] = useState(false);
    const updateCopied = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }
    return (
        <div className='card-footer'>
            <CopyToClipboard text={link}
            onCopy={updateCopied}>
            <p className='btn btn-default'>Share List</p>
            </CopyToClipboard>
            {copied && <Snack message={'Copied to clipboard!'} />}
        </div>
    )
    
}