

const getPrevStep = (currentStep) => currentStep-1
const getNextStep = (currentStep, steps) => currentStep+1 >= steps.length ? -1 : currentStep+1


class Flow extends React.Component {

  constructor(props){
    super(props) 

    const { currentStep: cs, initialStep: is, theme } = props
    
    const steps = props.steps || []
    const initialStep = is || 0
    const currentStep = cs || is || 0
    const prevStep = getPrevStep(currentStep)
    const nextStep = getNextStep(currentStep, steps)

    this.state = { 
        steps
      , initialStep
      , currentStep
      , prevStep
      , nextStep
      , theme: theme || 'light'
    }

    this.setStep = this.setStep.bind(this)
  }

  componentDidMount() {
    this.props.onRef&&this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef&&this.props.onRef(undefined)
  }


  // setStep() // next
  // setStep(-1) // previous
  // setStep(0,1,...) // specific
  // setStep('initial') // initial step
  setStep(index) {
    const { steps, currentStep, initialStep } = this.state
    let newStep

    if(!isNaN(index)) newStep = index == -1 ? currentStep-1 < 0 ? 0 : currentStep-1 : index
    else if(index == 'initital') newStep = initialStep
    else newStep = currentStep+1 >= steps.length ? 0 : currentStep+1

    const prevStep = getPrevStep(newStep)
    const nextStep = getNextStep(newStep, steps)

    this.setState({ 
        currentStep: newStep
      , prevStep 
      , nextStep 
    })
  }


  render() {
    const { children } = this.props
    const { currentStep, prevStep, nextStep, steps } = this.state

    const cs = { ...(steps[currentStep] || {}), index: currentStep }
    const ps = { ...(steps[prevStep] || {}), index: prevStep }
    const ns = { ...(steps[nextStep] || {}), index: nextStep }

    const widgetProps = { steps, cs, ps, ns, setStep: this.setStep }

    return (<div>
      {React.cloneElement(children, widgetProps)}
    </div>)
  }
}



export default Flow










