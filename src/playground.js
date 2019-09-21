import Flow, { Slot, FlowDebug } from './index'
import DotBar from './bundle/dotbar'
import NavMenu from './bundle/navmenu'



const FlowContent = (props) => {
  const { steps, setStep, cs, ps, ns } = props

  return (<div className="">
    <div><DotBar {...props} label={(o,i) => `${o.title}`} /></div>
    <div className="py-3"><NavMenu {...props} /></div>
    <div>{cs.children}</div>
  </div>)
}


export default (props) => {

  return (<div className="m-auto col-3">

    <Flow flows={'item,cart,payment'} cycle={false} current={0}>
      {(flow) => {

        const { current, prev, next } = flow.get()

        return (<div>
          <FlowDebug flow={flow} />

          <div className="bg-light p-4">
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

            <div className="p-2 pt-5 overflow-auto">
              { prev.index >= 0 && <button className="float-left btn btn-outline-dark" onClick={()=>flow.set(-1)}>{`< Back`}</button>}
              { next.index >= 0 && <button className="float-right btn btn-warning" onClick={()=>flow.set()}>{`Next >`}</button>}
              { current.id == 'payment' && <button className="float-right btn btn-success" onClick={()=>flow.set(0)}>Restart !</button>}
            </div>
          </div>

        </div>)
      }}
    </Flow>
    

  </div>)
}






