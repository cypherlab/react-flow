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

```js
import Flow, { Slot } from '@cypherlab/react-flow'

<Flow flows='one,two,three'>
  { flow => { 
    // build your scenario here
  }}
</Flow>
```

Scenario example:

See [Live demo](https://raw.githack.com/cypherlab/react-flow/master/index.html)  
See [Code example](https://github.com/cypherlab/react-flow/blob/master/index.html) 

```js
<Flow flows='item,cart,payment'>
  { flow => {

    // access some flow context
    const { current, prev, next } = flow.get()

    return (<div>

      <h2>{current.id.toUpperCase()}</h2>

      <Slot target="item">
        Nice T-Shirt
      </Slot>

      <Slot target="cart">
        Total: 25$
      </Slot>

      <Slot target="payment">
        Status: Payed !
      </Slot>

      { prev.index >= 0 && <a onClick={ ()=>flow.set(-1) }>{`< Back`}</a>}
      { next.index >= 0 && <a onClick={ ()=>flow.set() }>{`Next >`}</a>}
      { current.id == 'payment' && <a onClick={ ()=>flow.set(0) }>Restart !</a>}

    </div>)
  }}
</Flow>
```

## Flow options

| option        | info                                                            |
|---------------|-----------------------------------------------------------------|
| flows         | flows data. array of string. required                           |
| loop          | if `true`, flow.set() will cycle back to flow 0. default `false`|
| onRef         | way to catch instance. `onRef={ flow => (window.MyFlow = flow) }`|




## Flow instance methods

#### get(context)

`context` can be one of the following values `current|prev|next|flows`.
If no `context` is specified, return an object containing all contexts.

```js
flow.get('current') 
// { id: "item", index: 0 }

flow.get('next') 
// { id: "cart", index: 1 }

flow.get() 
// {
//     current: {...}
//   , prev: {...}
//   , next: {...}
//   , flows: [{...},...]
// }
```

#### set(index)

The `set()` function is used to navigate the flows.
  
```js
flow.set() // next flow
flow.set(-1) // previous flow
flow.set(0,1,...) // specific flow
flow.set('initial') // initial flow
```



## Slot

| option        | info                                                            |
|---------------|-----------------------------------------------------------------|
| target        | match flow `id`                                                 |
| show          | if `true` show anyway                                           |
| className     | apply class                                                     |



## Test 

You can play with the component in the browser via the `index.html`.

```js
(yarn|npm) run dev
```