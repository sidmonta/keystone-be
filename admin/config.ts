import type { AdminConfig } from '@keystone-6/core/types'
import { CustomNavigation } from './CustomNavigation'

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation
}