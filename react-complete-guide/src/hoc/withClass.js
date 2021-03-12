//const WithClass = props => <div className={props.classes}>{props.children}</div>

//SINCE WE DONT GET props HERE THIS IS NOT A FUNCTIONAL
//COMPONENT. IT IS A NORMAL JS ARROW FUNCTION THAT RETUNS
//A FUNCTIONAL COMPONENT
const withClass = (WrappedComponent, className) => props => (
   <div className={className}>
      <WrappedComponent {...props} />
   </div>
)

export default withClass
