import * as React from 'react'
import styled from 'styled-components'
import theme from '../util/theme'
import PrivacyStatement from './privacy-statement'

export interface FooterProps {
  style?: React.CSSProperties
}
const Footer: React.SFC<FooterProps> = style => (
  <Container style={style as any}>
    <FooterColumn>
      <WithLove>with ♥ from Microsoft</WithLove>
    </FooterColumn>
    <FooterColumn>
      <PrivacyStatement />
    </FooterColumn>
  </Container>
)

const Container = styled.div`
  display: flex;
  background-color: ${theme.palette.grey};
`

const FooterColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const WithLove = styled.div`
  color: ${theme.palette.whitish};
  font-family: sans-serif;
  font-size: 12px;
`

export default Footer
