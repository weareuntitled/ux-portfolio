/**
 * @deprecated KoVoN config now lives in the single source: portfolio.projects['kovon'].kovon.
 * Use getKovonConfig() from @/content/portfolio instead.
 */

import { getKovonConfig } from '@/content/portfolio';
import type { ContentTabItem } from '@/content/portfolio.types';

export type { ContentTabItem };

export const kovonContentTabs = getKovonConfig()?.contentTabs ?? [];
export const kovonWhereItLandedBullets = getKovonConfig()?.whereItLandedBullets ?? [];
export const kovonWhyRolloutStoppedBullets = getKovonConfig()?.whyRolloutStoppedBullets ?? [];
