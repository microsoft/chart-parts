import typography from '../configs/typography'

const { options: topts } = typography

export default {
  text: {
    fontFamily: topts.bodyFontFamily.join(', ') as string,
    lineHeight: topts.baseLineHeight as number,
    highlight: '#2D882D',
  },
  palette: {
    primary: '#AA3939',
    highlight: '#FFF3B0',
    alt: '#335C67',
    alt2: '#E09F3E',
    alt3: '#540B0E',
  },
  backgrounds: {
    sidebar: '#F6F6F6',
    header: '#AA3939',
  },
}
