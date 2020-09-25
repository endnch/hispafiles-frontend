import styled from '@emotion/styled'

const style = ({ theme }) => ({
  height: '3em',
  textAlign: 'center',
  '::after': {
    animation: 'segment-spin .6s linear',
    animationIterationCount: 'infinite',
    borderColor: `${theme.fgColor} rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.1)`,
    borderRadius: '500rem',
    borderStyle: 'solid',
    content: '""',
    height: '3em',
    margin: '0 0 0 -1.5em',
    position: 'absolute',
    width: '3em',
  },
})

export default styled.div(style)
