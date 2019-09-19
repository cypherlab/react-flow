
const getTheme = (name="light") => {

  let primary, unactive, secondary

  // default (light)
  primary = '#2f6fa9'
  unactive = '#6ba7da'
  secondary = '#eee'

  // dark
  if(name == "dark"){
    primary = '#ffc107'
    unactive = '#f9ba09'
    secondary = '#52585f'
  }

  const css = {
      bar: { height: 2, color: primary }
    , backbar: { height: 10, color: secondary }
    , dot: { width: 14, color: unactive, hover: primary, active: primary }
    , backdot: { width: 26, color: secondary }
    , label: { width: 100, color: 'inherit', fontSize: 14 }
  }

  return css
}


export default ({ 
  // flow props
    steps
  , setStep
  , cs
  , ps
  , ns
  // bundle specific
  , theme="light"
  , label=false 
}) => {

    const ratio = 100 / (steps.length - 1)
    const width = cs.index * ratio
    const css = getTheme(theme)

    return (<div>

      <div className="dotbar">
        <div className="dots">
          { steps.map((step, stepIndex) => (<div onClick={()=>setStep(stepIndex)} key={stepIndex}>
            <div className="backdot"> </div>
            <div className={`dot ${stepIndex<=cs.index?'active':''}`}> </div>
            { label != false && <div className="label">
              {label ? label(step, stepIndex) : (<small>{step}</small>)}
            </div>}
          </div>))}
        </div>
        <div className="backbar"></div>
        <div className="bar" style={{width: `${width}%`}}></div>
      </div>


      <style jsx>{`
        .dotbar {
          position: relative;
          z-index: 2;
        }
        .dotbar .dots {
          display: flex!important;
          justify-content: space-between!important;
        }
        .dotbar .dots > div {
          cursor: pointer;
        }
        .dotbar .label {
          position: absolute;
          top: -35px;
          margin-left: -${css.label.width/2}px;
          width: 100px;
          font-size: ${css.label.fontSize}px;
          color: ${css.label.color};
        }
        .dotbar .dot {
          background: ${css.dot.color};
          width: ${css.dot.width}px;
          height: ${css.dot.width}px;
          border-radius: 50%;
          margin-left: -${css.dot.width/2}px;
          margin-top: ${(css.backdot.width/2)-(css.dot.width/2)};
          // border: 2px solid #fff;
        }
        .dotbar .dot:hover {
          background: ${css.dot.hover};
        }
        .dotbar .dot.active {
          background: ${css.dot.active};
        }
        .dotbar .backdot {
          position: absolute;
          z-index: -1;
          margin-left: -${css.backdot.width/2}px;
          height: ${css.backdot.width}px;
          width: ${css.backdot.width}px;
          background: ${css.backdot.color};
          border-radius: 50%;
        }
        .dotbar .bar {
          z-index: -1;
          position: absolute;
          top: ${(css.backdot.width/2)-(css.bar.height/2)};
          height: ${css.bar.height}px;
          background: ${css.bar.color};
          -webkit-transition: width 1s ease;
            -moz-transition: width 1s ease;
              -o-transition: width 1s ease;
                 transition: width 1s ease;
        }
        .dotbar .backbar {
          z-index: -2;
          position: absolute;
          top: ${(css.backdot.width/2)-(css.backbar.height/2)};
          height: ${css.backbar.height}px;
          width: 100%;
          border-radius: 10px;
          background: ${css.backbar.color};
        }
      `}</style>

    </div>)
  }