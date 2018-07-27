// tslint:disable no-var-requires no-submodule-imports
import * as React from 'react'
import { TreeNode } from './interfaces'
import { Link as RawLink } from 'gatsby'
import styled from 'styled-components'
import theme from '../../util/theme'

const ExpandedIconRaw = require('react-icons/lib/fa/angle-down')
const CollapsedIconRaw = require('react-icons/lib/fa/angle-right')

export interface LinkTreeProps {
  node: TreeNode
  depth: number
  expanded?: boolean
  activePath: string
}

const ToggleSize = 15

export interface LinkTreeState {
  expanded: boolean
  hasBeenManuallyToggled: boolean
}

export default class LinkTree extends React.Component<
  LinkTreeProps,
  LinkTreeState
> {
  constructor(props: LinkTreeProps) {
    super(props)
    this.state = { expanded: !!props.expanded, hasBeenManuallyToggled: false }
    this.onExpandCollapseClick = this.onExpandCollapseClick.bind(this)
  }

  public componentDidMount() {
    const { activePath, node } = this.props
    if (activePath.startsWith(node.item.path)) {
      this.setState({ expanded: true })
    }
  }

  public render(): JSX.Element | null {
    const { node } = this.props
    const { item, children } = node
    if (!item) {
      return null
    }

    const childKeys = Object.keys(children)
    const linkStyle = this.getLinkStyle()
    return (
      <Container>
        <CurrentLevel>
          {this.renderIcon(childKeys)}
          <Link to={item.path} style={linkStyle}>
            {item.title || node.pathKey}
          </Link>
        </CurrentLevel>
        {this.renderChildren(childKeys)}
      </Container>
    )
  }

  private getLinkStyle(): React.CSSProperties {
    const {
      activePath,
      depth,
      node: { item },
    } = this.props

    const marginLeft = 15 + depth * 15
    const fontSize = 16 - depth * 2
    const linkStyle: React.CSSProperties = {
      marginLeft,
      fontSize,
    }

    if (activePath === item.path) {
      linkStyle.color = theme.text.highlight
      linkStyle.fontWeight = 500
    }

    return linkStyle
  }

  private renderIcon(childKeys: string[]) {
    if (childKeys.length === 0) {
      return <IconSpacer />
    } else if (this.state.expanded) {
      return (
        <ExpandedIcon onClick={this.onExpandCollapseClick} size={ToggleSize} />
      )
    } else {
      return (
        <CollapsedIcon onClick={this.onExpandCollapseClick} size={ToggleSize} />
      )
    }
  }

  private renderChildren(childKeys: string[]) {
    const { node, depth, activePath } = this.props
    const { expanded } = this.state
    if (!expanded) {
      return null
    }

    // Get the nodes for the children and sort them
    const childNodes = childKeys.map(ck => node.children[ck])
    childNodes.sort((a, b) => (a.item.order || 0) - (b.item.order || 0))

    return childNodes.map(c => (
      <LinkTree
        key={c.pathKey}
        node={c}
        depth={depth + 1}
        activePath={activePath}
      />
    ))
  }

  private onExpandCollapseClick() {
    this.setState({
      expanded: !this.state.expanded,
      hasBeenManuallyToggled: true,
    })
  }
}

const Container = styled.div``

const IconSpacer = styled.span`
  width: 15px;
`

const CurrentLevel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ExpandedIcon = styled(ExpandedIconRaw)`
  color: #999;
  cursor: pointer;
  width: 15px;
`

const CollapsedIcon = styled(CollapsedIconRaw)`
  color: #999;
  cursor: pointer;
  width: 15px;
`

const Link = styled(RawLink)`
  font-family: ${theme.text.fontFamily};
  line-height: ${theme.text.lineHeight * 1.5};
  font-weight: 100;
  font-size: 16px;
  display: flex;
  flex-direction: column;
`
