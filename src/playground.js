import Flow from './index'
import DotBar from './bundle/dotbar'
import NavMenu from './bundle/navmenu'



const STEPS = [
    { title: 'Cart', children: (<span>Cart</span>) }
  , { title: 'Shipping', children: (<span>Shipping</span>) }
  , { title: 'Recap', children: (<span>Recap</span>), hide: { prev: true } }
  , { title: 'Payment', children: (<span>Payment</span>) }
]


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
    
    <Flow {...props} 
      steps={STEPS}
      onRef={ref => (window.FlowRef = ref)}
    >
      <FlowContent />
    </Flow>

    <div className="py-5 m-auto">
      <a href="javascript:" onClick={()=>window.FlowRef.setStep('initital')} className="d-block btn btn-sm btn-light mb-2">setStep('initital')</a>
      <a href="javascript:" onClick={()=>window.FlowRef.setStep()} className="d-block btn btn-sm btn-light mb-2">setStep()</a>
      <a href="javascript:" onClick={()=>window.FlowRef.setStep(-1)} className="d-block btn btn-sm btn-light mb-2">setStep(-1)</a>
    </div>

  </div>)
}