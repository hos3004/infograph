import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// We define our entrypoint.
Config.setEntryPoint('./src/remotion/index.ts');
