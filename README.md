# `@cypherlab/react-flow`

<p align="center">
  <img width="444" alt="screenshot" src="https://user-images.githubusercontent.com/503577/65241677-71e8ed80-dae4-11e9-9213-bf10c8ebc507.png">
</p>

<p align="center">
  Flow is the glue between sequenced components.
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@cypherlab/react-flow">
    <img alt="npm" src="https://img.shields.io/npm/v/@cypherlab/react-flow">
  </a>
  <img alt="NPM badge" src="https://img.shields.io/npm/l/@cypherlab/react-flow">
</p>


## Install
```
npm i @cypherlab/react-flow
```


## Usage

See [Live demo](https://raw.githack.com/cypherlab/react-flow/master/index.html)  
See [Code example](https://github.com/cypherlab/react-flow/blob/master/index.html)  

```js
import Flow from '@cypherlab/react-flow'

const props = {
    steps: ['Cart', 'Shipping', 'Recap', 'Payment']
  , theme: 'dark' 
  , onRef: ref => (window['myFlow'] = ref)
}

// render
<Flow {...props} />

// ref usage
window['myFlow'].setStep(3)
```



## Table options

| option        | info                                                            |
|---------------|-----------------------------------------------------------------|
| steps         | steps data. array of anything. required                         |
| onRef         |                                                                 |
| onStep        |                                                                 |
| theme         | predefined theme                                                |

## Methods

| option        | info                                                            |
|---------------|-----------------------------------------------------------------|
| setStep       |   |



## Test 

You can play with the component in the browser via the `index.html`.

```js
(yarn|npm) run dev
```