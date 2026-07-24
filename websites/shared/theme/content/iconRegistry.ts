import type { Component } from 'vue'
import {
  AcademicCapIcon,
  Bars2Icon,
  BeakerIcon,
  BugAntIcon,
  ClockIcon,
  CloudArrowDownIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  NewspaperIcon,
  ServerIcon,
  TrophyIcon,
  WindowIcon,
} from '@heroicons/vue/24/outline'
import {
  Bars2Icon as Bars2IconSolid,
  BeakerIcon as BeakerIconSolid,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid,
  CloudArrowDownIcon as CloudArrowDownIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
  NewspaperIcon as NewspaperIconSolid,
  ServerIcon as ServerIconSolid,
} from '@heroicons/vue/24/solid'
import GraphQLIcon from '../components/icons/graphql.vue'
import NodejsIcon from '../components/icons/nodejs.vue'
import DiscordIcon from '../components/icons/discord.vue'

/**
 * Icons that Markdown content can reference by name
 * (e.g. on the "PageCard" component). The "solid/" prefix
 * selects the solid Heroicons variant; the default is outline.
 */
export const iconRegistry: Record<string, Component> = {
  AcademicCapIcon,
  Bars2Icon,
  BeakerIcon,
  BugAntIcon,
  ClockIcon,
  CloudArrowDownIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  NewspaperIcon,
  ServerIcon,
  TrophyIcon,
  WindowIcon,
  'solid/Bars2Icon': Bars2IconSolid,
  'solid/BeakerIcon': BeakerIconSolid,
  'solid/ChatBubbleBottomCenterIcon': ChatBubbleBottomCenterIconSolid,
  'solid/CloudArrowDownIcon': CloudArrowDownIconSolid,
  'solid/CurrencyDollarIcon': CurrencyDollarIconSolid,
  'solid/NewspaperIcon': NewspaperIconSolid,
  'solid/ServerIcon': ServerIconSolid,
  GraphQLIcon,
  NodejsIcon,
  DiscordIcon,
}
