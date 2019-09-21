import Microdot from './bundle/microdot'


const getPrevFlow = (current) => current-1
const getNextFlow = (current, flows) => current+1 >= flows.length ? -1 : current+1

const FlowContext = React.createContext({});


class Flow extends React.Component {

  constructor(props){
    super(props) 

    const { flows: f, current: cflow, initial: iflow, theme, cycle } = props
    
    const flows = typeof f == 'string' ? f.split(',').map(id => ({ id })) : f || []
    const initial = iflow || 0
    const current = cflow || iflow || 0
    const prev = getPrevFlow(current)
    const next = getNextFlow(current, flows)

    this.state = { 
        flows
      , initial
      , current
      , prev
      , next
      , theme: theme || 'light'
      , cycle: !!cycle || false
    }

    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }

  componentDidMount() {
    this.props.onRef&&this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef&&this.props.onRef(undefined)
  }


  // set() // next
  // set(-1) // previous
  // set(0,1,...) // specific
  // set('initial') // initial flow
  set(index) {
    const { flows, current, initial, cycle } = this.state
    let newFlow

    // previous & specific case
    if(!isNaN(index)) newFlow = index == -1 ? current-1 < 0 ? 0 : current-1 : index
    // initial case
    else if(index == 'initital') newFlow = initial
    // default case (next)
    else newFlow = current+1 >= flows.length 
      ? cycle ? 0 : current 
      : current+1

    if(newFlow == current) return

    const prev = getPrevFlow(newFlow)
    const next = getNextFlow(newFlow, flows)

    this.setState({ 
        current: newFlow
      , prev 
      , next 
    })
  }

  get(key) {
    const { current, prev, next, flows } = this.state

    const flow = {
        current: { ...(flows[current] || {}), index: current }
      , prev: { ...(flows[prev] || {}), index: prev }
      , next: { ...(flows[next] || {}), index: next }
      , flows: flows.map((f,i) => ({ ...f, index: i }))
    }

    return flow[key] || flow
  }

  render() {
    const { children } = this.props
    return (
      <FlowContext.Provider value={this}>
        {children(this)}
      </FlowContext.Provider>
    )
  }
}






export default Flow




export const Slot = class FlowSlot extends React.Component {
  render() {
    const { target, show, children, className } = this.props
    return (
      <FlowContext.Consumer>
        { flow => {
          const { current } = flow.get()
          return (show || current.id == target )
                  
            ? (<div className={`flow-${target} ${className}`}>
                {children}
              </div>)
            : null
        }}
      </FlowContext.Consumer>
    )
  }
}

export const FlowDebug = ({ flow, className }) => {
  const { current, flows } = flow.get()
  return (<div className={className||"py-3 m-auto"}>
    <a href="javascript:" onClick={()=>flow.set('initital')} className="btn btn-sm btn-outline-dark mx-1" style={{minWidth: 'auto'}}>x</a>
    <a href="javascript:" onClick={()=>flow.set(-1)} className="btn btn-sm btn-outline-dark mx-1" style={{minWidth: 'auto'}}>{`<`}</a>
    <Microdot flow={flow} />
    <a href="javascript:" onClick={()=>flow.set()} className="btn btn-sm btn-outline-dark mx-1" style={{minWidth: 'auto'}}>{`>`}</a>
  </div>)
}





