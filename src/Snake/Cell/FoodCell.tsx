import styled from 'styled-components'
import { GenericCellContainer } from './GenericCell'

const FoodCellContainer = styled(GenericCellContainer)`
  background-color: #f72585;
`

export function FoodCell(): JSX.Element {
  return <FoodCellContainer>🍎</FoodCellContainer>
}
