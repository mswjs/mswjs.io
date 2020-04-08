import React from 'react'
import { Box, Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
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
  icon: React.FC
}

const UsageItem: React.FC<UsageItemProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <Box flex flexDirection="column" alignItems="center" maxWidth="80%">
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
    <Grid paddingVertical={64} paddingVerticalMd={100}>
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
          description={`Test what matters: .... No stubs, no conditional URL, no servers.`}
        />
        <UsageItem
          icon={IoIosGitMerge}
          title="Incremental development"
          description={`Agree on the routes or queries, and kick off the frontend
          development in an instant.`}
        />
        <UsageItem
          icon={IoIosPeople}
          title="Workshops & tutorials"
          description={`Let your students focus on ..., while using standard-compliant
          "backend" implementations. Shorter, faster, instant setup.`}
        />
        <UsageItem
          icon={IoIosBug}
          title="Debugging"
          description={`Got an issue? Mock the very response that crashes your app. No more
          hours "just trying to get it right.`}
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
          yet? Let your components speak to mocks first, then decide.`}
        />
      </Composition>
    </Grid>
  )
}
