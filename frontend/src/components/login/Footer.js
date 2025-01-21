import React from 'react'
import './Footer.css'

const items = [
    {
        'href': 'https://santasoftltd.com/',
        'item': 'SantaSoft - An Automated Solution'
    },
    {
        'href': 'https://santasoftltd.com/work/',
        'item': 'Banking Solutions'
    },
    {
        'href': 'https://santasoftltd.com/work/',
        'item': 'Brokerage Solutions'
    },
    {
        'href': 'https://santasoftltd.com/work/',
        'item': 'Manufacturing, Processing and Distripution Solutions'
    },
    {
        'href': 'https://santasoftltd.com/work/',
        'item': 'Marketing Solutions'
    },
]

function Footer() {
  return (
    <div className='footer'>
        <div className='footer-1'>
            {items.map((item, index) =>(
                <a key={index} href={item.href} rel="noreferrer" target="_blank">{item.item}</a>
            ))}
        </div>
    </div>
  )
}

export default Footer