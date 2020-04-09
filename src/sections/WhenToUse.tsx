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
      <p>{description}</p>
    </Box>
  )
}

export const WhenToUse = () => {
  return (
    <Grid>
      <Divider />
      <Box paddingVertical={64} paddingVerticalMd={100}>
        <Box flex flexDirection="column" alignItems="center">
          <h2>When to use?</h2>
          <TextLead>Just a few examples of when MSW shines</TextLead>
        </Box>

        <Composition
          templateColsSm="repeat(2, 1fr)"
          templateColsXl="repeat(3, 1fr)"
          justifyItems="center"
          gap={64}
          marginTop={64}
        >
          <UsageItem
            icon={IoIosCheckmarkCircleOutline}
            title="Testing"
            description={`Test what matters: your code. No stubs, no conditional URL, no servers.`}
          />
          <UsageItem
            icon={IoIosGitMerge}
            title="Incremental development"
            description={`Agree on the routes or queries, and kick off the frontend
          development the same day. Simply disable the mocking once the backend is ready.`}
          />
          <UsageItem
            icon={IoIosPeople}
            title="Workshops & tutorials"
            description={`Let your students focus on the topic, while using a reliable
          "backend" implementation that is never down and behaves the same across different OS.`}
          />
          <UsageItem
            icon={IoIosBug}
            title="Debugging"
            description={`Got an issue? Mock the very response that crashes your app. No more
          hours "just trying to get it right".`}
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
