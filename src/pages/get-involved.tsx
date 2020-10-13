import React from 'react'
import { Link } from 'gatsby'
import { Box } from 'atomic-layout'
import SEO from '../components/seo'
import { Link as MdxLink } from '../components/mdx/Link'
import { PageLink } from '../components/mdx/PageLink'
import Layout from '../components/layout'
import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'

const GetInvolvedPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Get involved"
        description="Learn about the ways you can contribute to Mock Service Worker"
      />
      <Grid paddingVertical={64} paddingVerticalMd={80}>
        <Heading>Get involved</Heading>
        <Text>
          Hey! 👋 Thank you for considering contributing to Mock Service Worker.
          We are an open source project, so anybody is welcome to suggest ideas,
          raise issues, and provide improvements to MSW and all the surrounding
          repositories. It is by the power of incredible contributors we are
          shipping a superb API mocking experience to thousands of developers
          around the globe. Now you are one step closer to becoming a part of
          our community!
        </Text>

        <hr />

        <Heading level={2}>Ways to contribute</Heading>
        <Text>
          There are multiple ways to help, and those aren't limited by
          engineering alone. We understand and respect that our contributors
          come from different technical and cultural backgrounds, and we strive
          towards a smooth contribution experience, especially if this is your
          first open source involvement ever.
        </Text>

        <Box as="section" marginTop={32}>
          <Heading level={3}>Documentation</Heading>
          <Text>
            Technical writing is challenging and you could be helping by
            browsing <Link to="/docs">the project's documentation</Link> for the
            signs of improvement. For instance:
          </Text>
          <ul>
            <li>
              Spot and fix typos and overly complex grammatical constructions;
            </li>
            <li>Document missing features, options, and recipes;</li>
            <li>
              Suggest any changes that would make the docs more comprehensible.
            </li>
          </ul>
          <Text>
            Each documentation page has an "<i>Edit this page</i>" link at the
            bottom, clicking on which will forward you to the respective
            Markdown file you can edit and submit a pull request on GitHub.
          </Text>
        </Box>

        <Box as="section" marginTop={32}>
          <Heading level={3}>Examples</Heading>
          <Text>
            If you are passionate about MSW integration with other tools, look
            no further than our collection of{' '}
            <MdxLink href="https://github.com/mswjs/examples">
              usage examples
            </MdxLink>
            . Apart from being a great place to reference implementations, it's
            also a place that constantly requires attention:
          </Text>
          <ul>
            <li>Ensure various third-party libraries are up-to-date;</li>
            <li>Propose new usage examples featuring your favorite tools.</li>
          </ul>
          <Text>
            Follow the{' '}
            <MdxLink href="https://github.com/mswjs/examples/blob/master/.github/CONTRIBUTING.md">
              Examples Contribution Guidelines
            </MdxLink>{' '}
            to learn more about creating a new usage example in MSW.
          </Text>
        </Box>

        <Box as="section" marginTop={32}>
          <Heading level={3}>Website</Heading>
          <Text>
            Our{' '}
            <MdxLink href="https://github.com/mswjs/mswjs.io">
              very website
            </MdxLink>{' '}
            is a great place for a frontend practice. Built with Gatsby and
            powered by a custom documentation implementation, it makes both a
            challenge and a learning opportunity for you. Here are a few
            examples of things you can do concerning MSW website:
          </Text>
          <ul>
            <li>Improve the semantics and accessibility of the website;</li>
            <li>Suggest architecture improvements to a Gatsby project;</li>
            <li>Enhance UI and UX of the website.</li>
          </ul>
          <PageLink
            title="Submit a Pull request to the website"
            url="https://github.com/mswjs/mswjs.io/pulls"
            description="Website and Documentation repository"
          />
        </Box>

        <Box as="section" marginTop={32}>
          <Heading level={3}>Publications</Heading>
          <Text>
            Help others discover MSW through the content you create. In fact, if
            you've never written an article or recorded a video we{' '}
            <strong>strongly encourage you</strong> to try! Here are a few topic
            suggestions to start from:
          </Text>
          <ul>
            <li>Showcase how you or your team uses MSW;</li>
            <li>Teach a concept or a pattern you've adopted when using MSW;</li>
            <li>
              Illustrate how the library integrates with other tools you use.
            </li>
          </ul>
          <Text>Consider one of the following distribution platforms:</Text>
          <ul>
            <li>
              <MdxLink href="https://dev.to">dev.to</MdxLink>
            </li>
            <li>
              <MdxLink href="https://youtube.com">YouTube</MdxLink>
            </li>
            <li>
              <p>
                <i>Your custom blog!</i>
              </p>
            </li>
          </ul>
          <Text>
            Needless to say that content creation is a challenging and demanding
            endeavour. We are here to support your effort by sharing the
            materials you produce with others! Reach out to us on{' '}
            <MdxLink href="https://twitter.com/ApiMocking">Twitter</MdxLink> to
            share your awesome materials.
          </Text>
        </Box>

        <Box as="section" marginTop={32}>
          <Heading level={3}>Engineering</Heading>
          <Text>
            Tackle issues, collaborate on stunning features, or suggest internal
            refactoring—invaluable kind of contribution you may bring.
          </Text>
          <Text>
            MSW is a set of libraries that can help you expand your{' '}
            <MdxLink href="https://github.com/mswjs/msw">
              knowledge of the Service Worker API
            </MdxLink>
            , grant a{' '}
            <MdxLink href="https://github.com/mswjs/node-request-interceptor">
              low-level understanding of HTTP requests in NodeJS
            </MdxLink>
            , or even practice writing your own{' '}
            <MdxLink href="https://github.com/mswjs/msw-github-bot">
              GitHub bot
            </MdxLink>
            . There's always plenty of tasks to do, but it's twice as fun with a
            team of experienced engineers ready to help you with discussions,
            code reviews, and technical support.
          </Text>
          <Text>
            Start your journey by browsing any open issues with the{' '}
            <code>help wanted</code> or <code>good first issue</code> labels on{' '}
            <MdxLink href="https://github.com/mswjs">GitHub</MdxLink>. Once you
            find something you'd be interested in contributing, assign that
            issue to yourself so others know you are planning your work. See you
            in the pull requests!
          </Text>
        </Box>
      </Grid>
    </Layout>
  )
}

export default GetInvolvedPage
