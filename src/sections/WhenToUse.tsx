import React from 'react'
import { Box, Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Divider } from '../components/Divider'
import { IconType } from 'react-icons'
import {
  IoIosCheckmarkCircleOutline,
  IoIosGitMerge,
  IoIosPeople,
  IoIosBug,
  IoIosRocket,
} from 'react-icons/io'
import theme from '../theme'
import { Text } from '../components/Text'

interface UsageItemProps {
  title: string
  description: string
  icon: IconType
}

const UsageItem: React.FC<UsageItemProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Box flex flexDirection="column" alignItems="center" maxWidth="85%">
      <Icon size={64} fill={theme.colors.secondary} />
      <Box as="h3" marginTop={32}>
        {title}
      </Box>
      <Text color="gray">{description}</Text>
    </Box>
  )
}

export const WhenToUse = () => {
  return (
    <Grid>
      <Divider />
      <Box paddingVertical={64} paddingVerticalMd={100}>
        <Box flex flexDirection="column" alignItems="center">
          <h2>Don't stop there</h2>
          <TextLead>A few more examples of when MSW shines</TextLead>
        </Box>

        <Composition
          templateColsSm="repeat(2, 1fr)"
          templateColsXl="repeat(3, 1fr)"
          justifyItems="center"
          gap={64}
          marginTop={64}
        >
          <UsageItem
            icon={IoIosPeople}
            title="Workshops & tutorials"
            description={`Let your students focus on the topic, while using a reliable
          "backend" implementation that is never down and behaves the same across different OS.`}
          />
          <UsageItem
            icon={IoIosRocket}
            title="Prototyping"
            description={`Bring stunning ideas to life with the Service Worker as your data
          layer. REST today? GraphQL tomorrow? No strings attached.`}
          />
          <UsageItem
            icon={IoIosRocket}
            title="Learning"
            description={`Always wanted to try GraphQL, but don't want to adopt the ecosystem
          just yet? Let your components speak to mocks first, decide later.`}
          />
        </Composition>
      </Box>
    </Grid>
  )
}
