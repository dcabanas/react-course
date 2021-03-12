import { BurgerBuilder } from './BurgerBuilder'
import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder/>', () => {
   let wrapper
   beforeEach(() => {
      wrapper = shallow(<BurgerBuilder onInitIgs={() => {}} />)
   })

   it('should render <BuildControls /> when receiving ingredients', () => {
      wrapper.setProps({ igs: { salad: 0 } })
      expect(wrapper.find(BuildControls)).toHaveLength(1)
   })
})
