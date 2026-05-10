import * as migration_20260510_195316 from './20260510_195316';
import * as migration_20260511_000800 from './20260511_000800';

export const migrations = [
  {
    up: migration_20260510_195316.up,
    down: migration_20260510_195316.down,
    name: '20260510_195316'
  },
  {
    up: migration_20260511_000800.up,
    down: migration_20260511_000800.down,
    name: '20260511_000800'
  },
];
