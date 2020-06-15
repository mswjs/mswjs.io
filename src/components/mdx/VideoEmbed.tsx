import * as React from 'react'
import styled from 'styled-components'
import { AiOutlineLoading as LoadingIcon } from 'react-icons/ai'

const Container = styled.div`
  position: relative;
  margin: 2rem 0;
  padding-bottom: 56.25%;
  background-color: var(--color-gray-dim);
  border-radius: var(--border-radius);
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`

const FloatingLoadingIcon = styled(LoadingIcon)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 32px;
  width: 32px;
  margin: auto;

  animation: spin 1s linear infinite;
  fill: var(--color-primary);
`

interface Props {
  url: string
}

export const VideoEmbed: React.FC<Props> = ({ url }) => {
  return (
    <Container>
      <FloatingLoadingIcon />
      <iframe
        width="560"
        height="315"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Container>
  )
}
